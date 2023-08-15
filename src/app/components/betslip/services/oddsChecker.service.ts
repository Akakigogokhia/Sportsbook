import { Injectable } from '@angular/core';
import { PeriodResult } from 'src/app/shared/models/market.model';

interface eventChecker {
  [name: string]: {
    checkStatus: (
      position: string,
      fullTimeResults: PeriodResult,
      firstHalfResults?: PeriodResult
    ) => boolean;
  };
}

@Injectable({
  providedIn: 'root',
})
export class oddsCheckerService {
  checkEvents = (
    home: string,
    away: string,
    betType: string,
    position: string,
    halfTime: PeriodResult,
    fullTime: PeriodResult,
    result: { home: number; away: number }
  ) => {
    if (betType === 'Main Line') {
      if (position === '1') return result.home > result.away;
      else if (position === 'X') return result.home === result.away;
      else return result.home < result.away;
    } else if (betType === 'Double Chance') {
      if (position === '1X') return result.home >= result.away;
      else if (position === '12')
        return result.home > result.away || result.home < result.away;
      else return result.home <= result.away;
    } else if (!isNaN(+betType) && betType.trim() !== '') {
      if (position === 'over') {
        return +betType >= result.home + result.away;
      } else if (position === 'under') {
        return +betType <= result.home + result.away;
      } else if (position === '1') {
        return result.home + +betType > result.away;
      } else return result.home < result.away + +betType;
    } else if (betType === 'Half-Time/Full-Time') {
      const teams = position.split(' - ');
      const firstPeriod = teams[0];
      const fullPeriod = teams[1];

      if (this.checkHalfTimeResult(firstPeriod, halfTime, home, away)) {
        return this.checkFullTimeResult(fullPeriod, fullTime, home);
      } else {
        return false;
      }
    } else if (
      betType === 'Winning Margin' ||
      betType === 'Winning Margin 1st Half'
    ) {
      const teamAndMargin = position.split(' By ');
      const team = teamAndMargin[0];
      let expectedMargin: string | number = teamAndMargin[1];
      const period = betType.includes('1st Half') ? halfTime : fullTime;

      let atLeast = false;
      if (expectedMargin.endsWith('+')) {
        atLeast = true;
        expectedMargin = parseInt(expectedMargin.slice(0, -1), 10);
      } else {
        expectedMargin = parseInt(expectedMargin, 10);
      }

      if (!team || isNaN(expectedMargin)) {
        return false; //Unexpected
      }

      let actualMargin;
      if (team === home) {
        actualMargin = period.team_1_score - period.team_2_score;
      } else if (team === away) {
        actualMargin = period.team_2_score - period.team_1_score;
      } else {
        return false;
      }
      if (atLeast) {
        return actualMargin >= expectedMargin;
      } else {
        return actualMargin === expectedMargin;
      }
    } else if (betType === 'Any Score Draw (0:0 Excluded)') {
      return (
        fullTime.team_1_score + fullTime.team_2_score !== 0 &&
        fullTime.team_1_score === fullTime.team_2_score
      );
    } else if (betType === 'No Goal') {
      return fullTime.team_1_score + fullTime.team_2_score === 0;
    } else if (betType.includes('Total Goals Odd/Even')) {
      const period = betType.includes('1stHalf') ? halfTime : fullTime;
      if (position === 'Odd') {
        return (period.team_1_score + period.team_2_score) % 2 == 1;
      } else return (period.team_1_score + period.team_2_score) % 2 == 0;
    } else if (betType === home + ' Goals 1st Half') {
      return +position === halfTime.team_1_score;
    } else if (betType === away + ' Goals 1st Half') {
      return +position === halfTime.team_2_score;
    } else if (
      betType === 'Total Goals Range 1st Half' ||
      betType === 'Total Goals Range'
    ) {
      const range = position.split(' - ');
      const period = betType.includes('1st Half') ? halfTime : fullTime;
      const goals = period.team_1_score + period.team_2_score;
      if (range[0].includes('+')) {
        return goals >= +range[0][0];
      } else {
        return goals >= +range[0] && goals <= +range[1];
      }
    } else if (
      betType === 'Exact Total Goals 1st Half' ||
      betType === 'Exact Total Goals'
    ) {
      const period = betType.includes('1st Half') ? halfTime : fullTime;
      const goals = period.team_1_score + period.team_2_score;
      if (position.includes('+')) {
        return goals >= +position[0];
      } else return goals === +position;
    } else if (
      betType === home + ' To score?' ||
      betType === away + ' To score?'
    ) {
      if (betType.includes(home)) {
        return position === 'Yes'
          ? fullTime.team_1_score > 0
          : fullTime.team_1_score == 0;
      } else {
        return position === 'Yes'
          ? fullTime.team_2_score > 0
          : fullTime.team_2_score == 0;
      }
    } else if (betType.includes('Correct Score')) {
      let homeScore, awayScore;
      if (betType.includes('1st Half')) {
        homeScore = halfTime.team_1_score;
        awayScore = halfTime.team_2_score;
      } else {
        homeScore = fullTime.team_1_score;
        awayScore = fullTime.team_2_score;
      }
      const regex = /(\d+),.*?(\d+)/;
      const predictedScores = position.match(regex);
      return (
        homeScore === +predictedScores![1] && awayScore === +predictedScores![2]
      );
    } else if (betType.includes('Winner/Total Goals')) {
      const [predictedWinner, goalCondition] = position.split(' & ');
      const goalValue = parseFloat(goalCondition.split(' ')[1]);

      const totalGoals = fullTime.team_1_score + fullTime.team_2_score;

      let winner;
      if (fullTime.team_1_score > fullTime.team_2_score) {
        winner = home;
      } else if (fullTime.team_1_score < fullTime.team_2_score) {
        winner = away;
      }

      if (goalCondition.includes('Over')) {
        return winner === predictedWinner && totalGoals > goalValue;
      } else if (goalCondition.includes('Under')) {
        return winner === predictedWinner && totalGoals < goalValue;
      } else {
        return false; // Unexpected goal condition format
      }
    } else if (betType.includes('Both Teams To Score?')) {
      const period = betType.includes('1st Half') ? halfTime : fullTime;
      return position === 'Yes'
        ? period.team_1_score > 0 && period.team_2_score > 0
        : period.team_1_score == 0 || period.team_2_score == 0;
    } else if (betType.includes('Both Teams To Score/Total Goals')) {
      const [bothTeamsToScorePrediction, goalCondition] = position.split(' & ');

      const goalValue = parseFloat(goalCondition.split(' ')[1]);

      const totalGoals = fullTime.team_1_score + fullTime.team_2_score;

      const bothScored = fullTime.team_1_score > 0 && fullTime.team_2_score > 0;

      let bothTeamsToScoreCheck = false;
      if (bothTeamsToScorePrediction === 'Yes') {
        bothTeamsToScoreCheck = bothScored;
      } else if (bothTeamsToScorePrediction === 'No') {
        bothTeamsToScoreCheck = !bothScored;
      } else {
        return false; // Unexpected format for Both Teams To Score prediction
      }

      if (goalCondition.includes('Over')) {
        return bothTeamsToScoreCheck && totalGoals > goalValue;
      } else if (goalCondition.includes('Under')) {
        return bothTeamsToScoreCheck && totalGoals < goalValue;
      } else {
        return false; // Unexpected goal condition format
      }
    } else if (betType === home + ' Goals' || betType === away + ' Goals') {
      const goals = betType.includes(home)
        ? fullTime.team_1_score
        : fullTime.team_2_score;
      if (position.includes('+')) {
        return goals === +position[0];
      } else return goals === +position;
    } else if (betType.includes('Both Teams To Score/Winner')) {
      const [bothTeamsToScorePrediction, predictedWinner] =
        position.split(' & ');

      const bothScored = fullTime.team_1_score > 0 && fullTime.team_2_score > 0;

      let winner;
      if (fullTime.team_1_score > fullTime.team_2_score) {
        winner = home;
      } else if (fullTime.team_1_score < fullTime.team_2_score) {
        winner = away;
      }

      let bothTeamsToScoreCheck = false;
      if (bothTeamsToScorePrediction === 'Yes') {
        bothTeamsToScoreCheck = bothScored;
      } else if (bothTeamsToScorePrediction === 'No') {
        bothTeamsToScoreCheck = !bothScored;
      } else {
        return false;
      }

      return bothTeamsToScoreCheck && winner === predictedWinner;
    } else if (betType.includes('Odd/Even / Total Goals')) {
      const [oddEvenPrediction, goalCondition] = position.split(' & ');

      const totalGoals = fullTime.team_1_score + fullTime.team_2_score;

      const isOdd = totalGoals % 2 === 1;

      let oddEvenCheck = false;
      if (oddEvenPrediction === 'Odd') {
        oddEvenCheck = isOdd;
      } else if (oddEvenPrediction === 'Even') {
        oddEvenCheck = !isOdd;
      } else {
        return false; // Unexpected format for Odd/Even prediction
      }

      const goalValue = parseFloat(goalCondition.split(' ')[1]);

      if (goalCondition.includes('Over')) {
        return oddEvenCheck && totalGoals > goalValue;
      } else if (goalCondition.includes('Under')) {
        return oddEvenCheck && totalGoals < goalValue;
      } else {
        return false; // Unexpected
      }
    } else if (betType.includes('Either Team To Score?')) {
      const period = betType.includes('1st Half') ? halfTime : fullTime;
      return position === 'Yes'
        ? period.team_1_score + period.team_2_score > 0
        : period.team_1_score + period.team_2_score === 0;
    } else if (betType.includes('To Win to Nil?')) {
      const period = betType.includes('1st Half') ? halfTime : fullTime;
      const homeWinsToNil =
        period.team_1_score > 0 && period.team_2_score === 0;
      const awayWinsToNil =
        period.team_2_score > 0 && period.team_1_score === 0;

      if (betType.includes(home)) {
        return position == 'Yes' ? homeWinsToNil : !homeWinsToNil;
      } else {
        return position == 'Yes' ? awayWinsToNil : !awayWinsToNil;
      }
    } else if (betType.includes('3-Way Handicap')) {
      return this.checkThreeWayHandicap(
        betType,
        position,
        home,
        away,
        fullTime
      );
    } else return false;
  };

  checkHalfTimeResult(
    firstPeriod: string,
    halfTime: any,
    home: string,
    away: string
  ): boolean {
    if (firstPeriod === home) {
      return halfTime.team_1_score > halfTime.team_2_score;
    } else if (firstPeriod === away) {
      return halfTime.team_1_score < halfTime.team_2_score;
    } else {
      return halfTime.team_1_score === halfTime.team_2_score;
    }
  }

  checkFullTimeResult(
    fullPeriod: string,
    fullTime: any,
    home: string
  ): boolean {
    if (fullPeriod === home) {
      return fullTime.team_1_score > fullTime.team_2_score;
    } else if (fullPeriod === 'Draw') {
      return fullTime.team_1_score === fullTime.team_2_score;
    } else {
      return fullTime.team_1_score < fullTime.team_2_score;
    }
  }

  checkThreeWayHandicap(
    betType: string,
    position: string,
    home: string,
    away: string,
    fullTime: PeriodResult
  ): boolean {
    const [teamName, handicap] = betType
      .replace('3-Way Handicap ', '')
      .split(' ');
    const parsedHandicap = parseInt(handicap, 10);

    const scoreDifference = fullTime.team_1_score - fullTime.team_2_score;

    if (teamName === home) {
      const adjustedScoreDifference = scoreDifference + parsedHandicap;

      if (position.includes(home)) {
        return adjustedScoreDifference > 0;
      } else if (position.includes('Draw')) {
        return adjustedScoreDifference === 0;
      } else {
        return scoreDifference < -1;
      }
    } else if (teamName === away) {
      const adjustedScoreDifference = scoreDifference - parsedHandicap;

      if (position.includes(away)) {
        return adjustedScoreDifference < -1;
      } else if (position.includes('Draw')) {
        return adjustedScoreDifference === 0;
      } else {
        return scoreDifference > 1;
      }
    }

    // Unexpected
    else {
      return false;
    }
  }
}

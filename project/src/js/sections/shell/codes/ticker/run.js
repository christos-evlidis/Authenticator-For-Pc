import { dataCodeClock, dataCodeGenerate, dataCodeOptions, dataCodeTypeHotp } from "../../../../services/data/data-index.js";

import { codesStateStore } from "../state/store.js";
import { codesUtilPiePathBuild } from "../util/pie.js";
import { codesUtilTimerPreferenceSave } from "../util/timer-preference.js";

import { CODES_HIDDEN_CLASS } from "../../../../const/const.codes.js";

/** Updates the TOTP pie timer SVG for the current angle. */
function _codesTickerPieUpdate(piePath, angle, lastPathRef) {
  if (!piePath) {
    return lastPathRef;
  }

  const path = codesUtilPiePathBuild(angle);

  if (path !== lastPathRef.value) {
    piePath.setAttribute("d", path);
    piePath.classList.toggle(CODES_HIDDEN_CLASS, !path);
    lastPathRef.value = path;
  }

  return lastPathRef;
}

/** Applies global timer invert preference to all card timers. */
function _codesTickerInvertedSync() {
  for (const root of codesStateStore.cardRoots) {
    root.els.timer?.classList.toggle("inverted", codesStateStore.globalTimerInverted);
  }
}

/** Flips timer direction when the TOTP period rolls over. */
function _codesTickerPeriodRollover(clock) {
  if (codesStateStore.globalLastTimerPeriod === null) {
    codesStateStore.globalLastTimerPeriod = clock.period;
    return;
  }

  if (clock.period === codesStateStore.globalLastTimerPeriod) {
    return;
  }

  codesStateStore.globalTimerInverted = !codesStateStore.globalTimerInverted;
  void codesUtilTimerPreferenceSave(codesStateStore.globalTimerInverted);
  _codesTickerInvertedSync();
  codesStateStore.globalLastTimerPeriod = clock.period;
}

/** Regenerates and displays the OTP code for a card. */
function _codesTickerAccountCodeUpdate(root) {
  const { account, els } = root;
  const otpOptions = dataCodeOptions(account);
  const otp = dataCodeGenerate(account.secret, otpOptions);
  const digits = otpOptions.digits;

  if (els.code) {
    els.code.textContent =
      otp && otp.length === digits ? otp : "-".repeat(digits);
  }
}

/** Updates timer pie visuals for a TOTP card. */
function _codesTickerVisualsUpdate(root, clock) {
  const pieFg = root.els.pieFg;

  if (!pieFg) {
    return;
  }

  pieFg.classList.remove(CODES_HIDDEN_CLASS);
  _codesTickerPieUpdate(pieFg, clock.angle, root.lastPiePath);
}

/** Runs one ticker tick for all TOTP cards. */
function _codesTickerSecondRun() {
  let rolloverClock = null;

  for (const root of codesStateStore.cardRoots) {
    if (dataCodeTypeHotp(root.account)) {
      continue;
    }

    const clock = dataCodeClock(dataCodeOptions(root.account));

    if (!rolloverClock) {
      rolloverClock = clock;
    }

    _codesTickerAccountCodeUpdate(root);
  }

  if (rolloverClock) {
    _codesTickerPeriodRollover(rolloverClock);
  }

  for (const root of codesStateStore.cardRoots) {
    if (dataCodeTypeHotp(root.account)) {
      continue;
    }

    const clock = dataCodeClock(dataCodeOptions(root.account));
    _codesTickerVisualsUpdate(root, clock);
  }
}

/** Stops the interval ticker and clears card roots. */
function _codesTickerStop() {
  if (codesStateStore.tickIntervalId != null) {
    clearInterval(codesStateStore.tickIntervalId);
    codesStateStore.tickIntervalId = null;
  }

  codesStateStore.cardRoots = [];
}

/** Returns whether any rendered account uses TOTP. */
function _codesTickerHasTotp() {
  return codesStateStore.cardRoots.some((root) => !dataCodeTypeHotp(root.account));
}

/** Returns the first TOTP card root, if any. */
function _codesTickerFirstTotpRoot() {
  return (
    codesStateStore.cardRoots.find((root) => !dataCodeTypeHotp(root.account)) ?? null
  );
}

/** Starts aligned second-bound ticker updates for TOTP cards. */
function _codesTickerStart() {
  if (codesStateStore.tickIntervalId != null) {
    clearInterval(codesStateStore.tickIntervalId);
    codesStateStore.tickIntervalId = null;
  }

  if (!codesStateStore.cardRoots.length) {
    return;
  }

  for (const root of codesStateStore.cardRoots) {
    if (dataCodeTypeHotp(root.account)) {
      _codesTickerAccountCodeUpdate(root);
    }
  }

  if (!_codesTickerHasTotp()) {
    return;
  }

  codesStateStore.globalLastTimerPeriod = null;
  _codesTickerInvertedSync();

  const firstTotp = _codesTickerFirstTotpRoot();
  _codesTickerPeriodRollover(
    dataCodeClock(firstTotp ? dataCodeOptions(firstTotp.account) : {}),
  );

  for (const root of codesStateStore.cardRoots) {
    if (dataCodeTypeHotp(root.account)) {
      continue;
    }

    const clock = dataCodeClock(dataCodeOptions(root.account));
    _codesTickerAccountCodeUpdate(root);
    _codesTickerVisualsUpdate(root, clock);
  }

  const msUntilNextSecond = 1000 - (Date.now() % 1000);

  window.setTimeout(() => {
    _codesTickerSecondRun();
    codesStateStore.tickIntervalId = window.setInterval(_codesTickerSecondRun, 1000);
  }, msUntilNextSecond);
}

/** Primes OTP display and timer visuals for one card. */
function _codesTickerCardPrime(card) {
  const root = codesStateStore.cardRoots.find((item) => item.card === card);

  if (!root) {
    return;
  }

  if (dataCodeTypeHotp(root.account)) {
    _codesTickerAccountCodeUpdate(root);
    return;
  }

  root.els.timer?.classList.toggle("inverted", codesStateStore.globalTimerInverted);
  root.lastPiePath.value = "";

  const clock = dataCodeClock(dataCodeOptions(root.account));
  _codesTickerAccountCodeUpdate(root);
  _codesTickerVisualsUpdate(root, clock);
}

export {
  _codesTickerAccountCodeUpdate as codesTickerAccountCodeUpdate,
  _codesTickerCardPrime as codesTickerCardPrime,
  _codesTickerSecondRun as codesTickerSecondRun,
  _codesTickerStart as codesTickerStart,
  _codesTickerStop as codesTickerStop,
};

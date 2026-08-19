/** Computes TOTP timing state for the current epoch second. */
function dataCodeClock(options) {
  try {
    const period = options.period;
    if (!period || period < 1) {
      console.warn("[data-code] dataCodeClock: invalid period", options.period);
      return {
        period: 0,
        timeLeft: 0,
        elapsedInStep: 0,
        progress: 0,
        angle: 0,
      };
    }
    const epochSec = Math.floor(Date.now() / 1000);
    const elapsedInStep = epochSec % period;
    const stepPeriod = Math.floor(epochSec / period);
    const timeLeft = elapsedInStep === 0 ? 0 : period - elapsedInStep;
    const fillAngle =
      elapsedInStep >= period - 1 ? 360 : ((elapsedInStep + 1) / period) * 360;
    return {
      period: stepPeriod,
      timeLeft,
      elapsedInStep,
      progress: (elapsedInStep + 1) / period,
      angle: fillAngle,
    };
  } catch (error) {
    console.warn("[data-code] dataCodeClock failed", error);
    return {
      period: 0,
      timeLeft: 0,
      elapsedInStep: 0,
      progress: 0,
      angle: 0,
    };
  }
}

export { dataCodeClock };

import { CODES_PIE_ARC_RADIUS } from "../../../../const/const.codes.js";
import { CODES_PIE_CENTER } from "../../../../const/const.codes.js";

/** Builds an SVG path for the TOTP timer pie slice. */
function _codesUtilPiePathBuild(angle) {
  if (angle <= 0) {
    return "";
  }

  if (angle >= 360) {
    return `M${CODES_PIE_CENTER} ${CODES_PIE_CENTER} L${CODES_PIE_CENTER} ${CODES_PIE_CENTER - CODES_PIE_ARC_RADIUS} A${CODES_PIE_ARC_RADIUS} ${CODES_PIE_ARC_RADIUS} 0 1 1 ${CODES_PIE_CENTER} ${CODES_PIE_CENTER + CODES_PIE_ARC_RADIUS} A${CODES_PIE_ARC_RADIUS} ${CODES_PIE_ARC_RADIUS} 0 1 1 ${CODES_PIE_CENTER} ${CODES_PIE_CENTER - CODES_PIE_ARC_RADIUS} Z`;
  }

  const startAngle = -90;
  const endAngle = startAngle + angle;
  const startRad = (startAngle * Math.PI) / 180;
  const endRad = (endAngle * Math.PI) / 180;
  const startX = CODES_PIE_CENTER + Math.cos(startRad) * CODES_PIE_ARC_RADIUS;
  const startY = CODES_PIE_CENTER + Math.sin(startRad) * CODES_PIE_ARC_RADIUS;
  const endX = CODES_PIE_CENTER + Math.cos(endRad) * CODES_PIE_ARC_RADIUS;
  const endY = CODES_PIE_CENTER + Math.sin(endRad) * CODES_PIE_ARC_RADIUS;

  if (angle < 180) {
    return `M${CODES_PIE_CENTER} ${CODES_PIE_CENTER} L${startX} ${startY} A${CODES_PIE_ARC_RADIUS} ${CODES_PIE_ARC_RADIUS} 0 0 1 ${endX} ${endY} Z`;
  }

  if (angle === 180) {
    return `M${CODES_PIE_CENTER} ${CODES_PIE_CENTER} L${startX} ${startY} A${CODES_PIE_ARC_RADIUS} ${CODES_PIE_ARC_RADIUS} 0 0 1 ${endX} ${endY} Z`;
  }

  const midAngle = startAngle + 180;
  const midRad = (midAngle * Math.PI) / 180;
  const midX = CODES_PIE_CENTER + Math.cos(midRad) * CODES_PIE_ARC_RADIUS;
  const midY = CODES_PIE_CENTER + Math.sin(midRad) * CODES_PIE_ARC_RADIUS;

  return `M${CODES_PIE_CENTER} ${CODES_PIE_CENTER} L${startX} ${startY} A${CODES_PIE_ARC_RADIUS} ${CODES_PIE_ARC_RADIUS} 0 1 1 ${midX} ${midY} A${CODES_PIE_ARC_RADIUS} ${CODES_PIE_ARC_RADIUS} 0 0 1 ${endX} ${endY} Z`;
}

export { _codesUtilPiePathBuild as codesUtilPiePathBuild };

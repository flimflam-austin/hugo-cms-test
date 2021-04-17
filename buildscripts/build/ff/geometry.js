const degreesToRads = degrees => (degrees * Math.PI) / 180.0

const radsToDegrees = rads => (rads * 180.0) / Math.PI;

const distanceBetweenPoints = (x0, y0, x1, y1) => Math.hypot(x1 - x0, y1 - y0)

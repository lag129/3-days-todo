/**
 * ミリ秒をHH:MM:SS形式に変換する
 * @param {number} millisec 
 * @returns 
 */
export default function formatMillisec2HHMMSS(millisec) {
  const hours = Math.floor(millisec / (1000 * 60 * 60));
  const minutes = Math.floor((millisec % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((millisec % (1000 * 60)) / 1000);
  return [hours, minutes, seconds].map((num) => num.toString().padStart(2, "0")).join(":");
}
export function playNum(num) { // 把超过一万的播放数以1.0万显示
  if (num >= 10000) {
    return (num / 10000).toFixed(1) + '万'
  }
  return num
}

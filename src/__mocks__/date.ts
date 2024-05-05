export default function setDate(year: number, month: number, day: number, hour: number) {
  Date.now = jest.fn(() => new Date(Date.UTC(year, month, day, hour)).valueOf());
}

export function setPinnedDate() {
  setDate(2020, 10, 10, 4);
}

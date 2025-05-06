
import { sum } from '../sample/dummy';

describe('sum 関数', () => {
  it('1 + 1 は 2 である', () => {
    expect(sum(1, 1)).toBe(2);
  });

  it('正の数同士の足し算', () => {
    expect(sum(5, 3)).toBe(8);
  });

  it('負の数同士の足し算', () => {
    expect(sum(-2, -4)).toBe(-6);
  });

  it('正の数と負の数の足し算', () => {
    expect(sum(10, -5)).toBe(5);
  });

  it('ゼロとの足し算', () => {
    expect(sum(7, 0)).toBe(7);
    expect(sum(0, -3)).toBe(-3);
  });
});
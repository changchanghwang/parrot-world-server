import { Money } from '@value-objects';

describe('Money 테스트', () => {
  describe('from', () => {
    test('Money 객체를 생성한다.', () => {
      const money = Money.of({ amount: 1000, currency: '원' });

      expect(money).toBeInstanceOf(Money);
      expect(money.amount).toBe(1000);
      expect(money.currency).toBe('원');
    });
  });

  describe('with', () => {
    test('기존 Money 객체에 amount를 변경한다.', () => {
      const money = Money.of({ amount: 1000, currency: '원' });
      const newMoney = money.with(2000);

      expect(newMoney).toBeInstanceOf(Money);
      expect(newMoney.amount).toBe(2000);
      expect(newMoney.currency).toBe('원');
    });
    test('원본은 건드리지 않고 새로운 객체를 반환한다.', () => {
      const money = Money.of({ amount: 1000, currency: '원' });
      const newMoney = money.with(2000);

      expect(money).not.toBe(newMoney);
      expect(money.amount).toBe(1000);
      expect(money.currency).toBe('원');
    });
  });
});

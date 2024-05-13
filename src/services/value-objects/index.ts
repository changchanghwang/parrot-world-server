import { Column } from 'typeorm';

type CurrencyType = '원';

export class Money {
  @Column()
  amount!: number;

  @Column()
  currency!: CurrencyType;

  constructor(args: { amount: number; currency: CurrencyType }) {
    if (args) {
      this.amount = args.amount;
      this.currency = args.currency;
    }
  }

  static of({ amount, currency }: { amount: number; currency: CurrencyType }) {
    return new Money({ amount, currency });
  }

  with(amount: number) {
    return new Money({ amount, currency: this.currency });
  }
}

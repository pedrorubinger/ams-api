import { Entity, IEntity } from "@core"

enum DonationCategory {
  PIX = "PIX",
  COPASA = "COPASA",
  TICKET = "TICKET", // Carnê
}

enum DonationBillingMonthStatus {
  PENDING = "PENDING",
  DONE = "DONE",
}

interface IDonationProps {
  partnerId: string
  incomeDate: Date
  billingDate: string[]
  category: DonationCategory
  value: number // in cents
  description?: string
  tenantId: string
}

type IDonation = IEntity<IDonationProps>

class Donation extends Entity<IDonationProps> {
  constructor(props: IDonationProps, id?: string) {
    super(props, id)
  }

  public static create(props: IDonationProps, id?: string) {
    const partner = new Donation(props, id)

    return partner
  }
}

export { Donation, IDonation, DonationCategory, DonationBillingMonthStatus }

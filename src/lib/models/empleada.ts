export class Empleada {
  id: string
  nombre: string
  created: Date

  static fromObservable(observable: any): Empleada {
    const e = new Empleada()
    e.id = observable.id
    e.nombre = observable.nombre
    e.created = observable.created.toDate()
    return e
  }

  createdFmt(): string {
    return this.created.toISOString().substr(0,10)
  }
}

export class Quincena {
  id: string
  nombre: string
  fecha: Date
  created: Date

  static fromObservable(observable: any): Quincena {
    const q = new Quincena()
    q.id = observable.id
    q.nombre = observable.nombre
    q.fecha = observable.fecha.toDate()
    q.created = observable.created.toDate()
    return q
  }

  fechaFmt(): string {
    return this.fecha.toISOString().substr(0,10)
  }

  createdFmt(): string {
    return this.created.toISOString().substr(0,10)
  }
}

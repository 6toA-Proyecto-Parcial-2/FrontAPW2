export interface IInventario {
  id?: number;
  numeroCopias: number;
  estado: string;
  precioVenta: number;
  precioAlquiler: number;
  encargadoId: number;
  negocioId: number;
}

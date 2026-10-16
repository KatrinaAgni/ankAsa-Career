export type KonfigHarga = {
  biayaDasar: number;
  tarifPerHalaman: number;
  biayaIlustrasi: number;
  minimumHarga: number;
};

export const KONFIG_HARGA_DEFAULT: KonfigHarga = {
  biayaDasar: 25000,
  tarifPerHalaman: 1500,
  biayaIlustrasi: 20000,
  minimumHarga: 50000,
};

function jenjangFactor(jenjang?: string | null): number {
  switch (jenjang) {
    case "TK/PAUD":
      return 1.15;
    case "SD":
      return 1.0;
    case "SMP":
      return 1.05;
    case "SMA":
      return 1.1;
    case "Kuliah":
      return 1.25;
    default:
      return 1.0;
  }
}

export function hitungEstimasiHarga(params: {
  jumlahHalaman?: number | null;
  jenjang?: string | null;
  butuhIlustrasi?: boolean;
  konfig?: KonfigHarga;
}): number {
  const konfig = params.konfig ?? KONFIG_HARGA_DEFAULT;
  const halaman = Math.max(1, Number(params.jumlahHalaman) || 20);

  let total =
    konfig.biayaDasar +
    halaman * konfig.tarifPerHalaman +
    (params.butuhIlustrasi ? konfig.biayaIlustrasi : 0);

  total = total * jenjangFactor(params.jenjang);
  total = Math.max(total, konfig.minimumHarga);

  return Math.round(total / 500) * 500;
}

export function formatRupiah(nilai?: number | null): string {
  if (nilai === null || nilai === undefined || Number.isNaN(nilai)) {
    return "-";
  }
  return "Rp " + new Intl.NumberFormat("id-ID").format(nilai);
}

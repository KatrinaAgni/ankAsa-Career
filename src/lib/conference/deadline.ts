const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/

export function isDeadlinePassed(
  row: { deadline_daftar: string | null | undefined },
  today: string
) {
  const deadline = row.deadline_daftar
  return !!deadline && ISO_DATE.test(deadline) && deadline < today
}

export function isInactiveConference(
  row: {
    deadline_daftar: string | null | undefined
    tanggal_mulai: string
    tanggal_selesai: string | null | undefined
  },
  today: string
) {
  const endDate = row.tanggal_selesai ?? row.tanggal_mulai
  return isDeadlinePassed(row, today) || endDate < today
}

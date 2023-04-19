import { create } from 'zustand'
import { ITeacherInfo } from '@/typings/interfaces/teacher'

interface Store {
  id: number
  userName: string
  setInfo: (info: ITeacherInfo) => void
}

export const useStore = create<Store>((set) => ({
  id: -1,
  userName: '',
  setInfo: ({ id, userName }: ITeacherInfo) =>
    set({
      id,
      userName
    })
}))

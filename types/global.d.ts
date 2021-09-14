/*
 * @Author: konnga
 * @Date: 2021-07-21 17:17:17
 * @LastEditors: konnga
 * @LastEditTime: 2021-09-14 09:20:50
 * @Description:
 */
declare type Recordable<T = any> = Record<string, T>

declare interface todo {
  id: number
  value: string
  completed?: boolean
}
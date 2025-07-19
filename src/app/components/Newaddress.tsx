'use client'

import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import React, { useEffect, useMemo } from 'react'
import { useAddressData } from '@/app/GlobalContext'
import { Input } from '@/components/ui/input'

type AddressValue = {
  provinceCode: string
  wardCode: string
  detail: string
}

type Props = {
  value: AddressValue
  onChange: (value: AddressValue) => void
}

function NewAddress({ value, onChange }: Props) {
  const { addressData } = useAddressData()

  const handleProvinceChange = (provinceCode: string) => {
    onChange({ provinceCode, wardCode: '', detail: '' }) // Reset ward & detail nếu chọn tỉnh mới
  }

  const handleWardChange = (wardCode: string) => {
    onChange({ ...value, wardCode })
  }

  const handleDetailChange = (detail: string) => {
    onChange({ ...value, detail })
  }

  const selectedProvince = useMemo(() => {
    return addressData?.find((e: any) => String(e.code) === value.provinceCode)
  }, [addressData, value.provinceCode])

  const wardList = selectedProvince?.wards || []

  return (
    <div className='flex flex-col gap-3 my-2'>
      <div className='flex gap-4'>
        {/* Select Tỉnh */}
        <div className='flex flex-1 flex-col gap-4'>
          <Select value={value.provinceCode} onValueChange={handleProvinceChange}>
            <SelectTrigger className='w-full'>
              <SelectValue placeholder='Tỉnh/Thành phố' />
            </SelectTrigger>
            <SelectContent>
              {addressData?.map((p: any) => (
                <SelectItem key={p.code} value={String(p.code)}>
                  {p.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Select Phường/Xã */}
        <div className='flex flex-1 flex-col gap-4'>
          <Select value={value.wardCode} onValueChange={handleWardChange}>
            <SelectTrigger className='w-full'>
              <SelectValue placeholder='Phường/Xã' />
            </SelectTrigger>
            <SelectContent>
              {wardList.map((w: any) => (
                <SelectItem key={w.code} value={String(w.code)}>
                  {w.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Input chi tiết địa chỉ */}
      <Input
        className=""
        placeholder="Địa chỉ chi tiết"
        value={value.detail}
        onChange={e => handleDetailChange(e.target.value)}
      />
    </div>
  )
}

export default NewAddress

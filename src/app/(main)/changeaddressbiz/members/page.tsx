'use client';
// eslint-disable-next-line
import React, { useEffect, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import NewAddress from '@/app/components/Newaddress';
import { Button } from '@/components/ui/button';



function Members({ ownerName, onChange }: any) {
  const emptyMember = () => ({
    name: '',
    address_permanent: '',
    address_contact: '',
    permanent: { provinceCode: '', wardCode: '', detail: '' },
    contact: { provinceCode: '', wardCode: '', detail: '' },
  });

  const [members, setMembers] = useState([
    { ...emptyMember(), name: ownerName }
  ]);

  // Format address helper
  const formatAddress = (addr: { provinceCode: string; wardCode: string; detail: string }) =>
    [addr.detail, addr.wardCode, addr.provinceCode].filter(Boolean).join(', ');



  const handleChange = (idx: number, field: string, value: any) => {
    setMembers((prev) => {
      const next = prev.map((m, i) =>
        i === idx ? { ...m, [field]: value } : m
      );
      onChange(
        next.map((m) => ({
          name: m.name,
          address_permanent: formatAddress(m.permanent),
          address_contact: formatAddress(m.contact),
        }))
      );
      return next;
    });
  };

  const handleAddressChange = (idx: number, type: 'permanent' | 'contact', value: any) => {
    setMembers((prev) => {
      const next = prev.map((m, i) =>
        i === idx ? { ...m, [type]: value } : m
      );
      onChange(
        next.map((m) => ({
          name: m.name,
          address_permanent: formatAddress(m.permanent),
          address_contact: formatAddress(m.contact),
        }))
      );
      return next;
    });
  };

  const addMember = () => {
    setMembers((prev) => {
      const next = [...prev, emptyMember()];
      onChange(
        next.map((m) => ({
          name: m.name,
          address_permanent: formatAddress(m.permanent),
          address_contact: formatAddress(m.contact),
        }))
      );
      return next;
    });
  };

  const removeMember = (idx: number) => {
    setMembers((prev) => {
      const next = prev.filter((_, i) => i !== idx);
      onChange(
        next.map((m) => ({
          name: m.name,
          address_permanent: formatAddress(m.permanent),
          address_contact: formatAddress(m.contact),
        }))
      );
      return next;
    });
  };

  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-lg font-semibold">Danh sách thành viên</h3>
      {members.map((member, idx) => (
        <div key={idx} className="border p-4 rounded-md mb-2 relative ">
          {members.length > 1 && (
            <Button
              variant="destructive"

              type="button"
              className="absolute top-2 right-2 cursor-pointer "
              onClick={() => removeMember(idx)}
            >
              Xóa
            </Button>
          )}
          <div className="flex flex-col gap-2">
            <Label className='mt-3'>Họ và tên</Label>
            <Input
              type="text"
              placeholder="Họ và tên thành viên"
              value={member.name}
              onChange={(e) => handleChange(idx, 'name', e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-2 mt-2">
            <Label>Địa chỉ thường trú</Label>
            <NewAddress value={member.permanent} onChange={(v) => handleAddressChange(idx, 'permanent', v)} />
          </div>
          <div className="flex flex-col gap-2 mt-2">
            <Label>Địa chỉ liên lạc</Label>
            <NewAddress value={member.contact} onChange={(v) => handleAddressChange(idx, 'contact', v)} />
          </div>
          
        </div>
      ))}
      <button
        type="button"
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 w-fit"
        onClick={addMember}
      >
        Thêm thành viên
      </button>
    </div>
  );
}

export default Members;

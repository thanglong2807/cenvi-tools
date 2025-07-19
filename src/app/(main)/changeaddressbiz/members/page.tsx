'use client';
// eslint-disable-next-line
import React, { useEffect, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import NewAddress from '@/app/components/Newaddress';



function Members({ ownerName, onChange } : any) {
  

  const [name, setName] = useState(ownerName);

  const [memberPermanentAddress, setMemberPermanentAddress] = useState({
    provinceCode: '',
    wardCode: '',
    detail: ''
  });

  const [memberContactAddress, setMemberContactAddress] = useState({
    provinceCode: '',
    wardCode: '',
    detail: ''
  });


  useEffect(() => {
    const formatAddress = (addr: typeof memberPermanentAddress) =>
      [addr.detail, addr.wardCode, addr.provinceCode].filter(Boolean).join(', ');
    if (!name) return; 
    onChange({
      name,
      address_permanent: formatAddress(memberPermanentAddress),
      address_contact: formatAddress(memberContactAddress)
    });
  }, [name, memberPermanentAddress, memberContactAddress, onChange]);

  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-lg font-semibold">Thành viên</h3>

      <div className="flex flex-col gap-2">
        <Label>Họ và tên</Label>
        <Input
          type="text"
          placeholder="Họ và tên thành viên"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <div className="flex flex-col gap-2">
        <Label>Địa chỉ thường trú</Label>
        <NewAddress value={memberPermanentAddress} onChange={setMemberPermanentAddress} />
      </div>

      <div className="flex flex-col gap-2">
        <Label>Địa chỉ liên lạc</Label>
        <NewAddress value={memberContactAddress} onChange={setMemberContactAddress} />
      </div>
    </div>
  );
}

export default Members;

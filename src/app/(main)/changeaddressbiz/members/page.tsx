'use client';
import React, { useEffect, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import NewAddress from '@/app/components/Newaddress';

interface MemberProps {
  ownerName: string;
  onChange: (data: {
    name: string;
    address_permanent: string;
    address_contact: string;
  }) => void;
}

function Members({ ownerName, onChange }: MemberProps) {
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

  const formatAddress = (addr: typeof memberPermanentAddress) =>
    [addr.detail, addr.wardCode, addr.provinceCode].filter(Boolean).join(', ');

  useEffect(() => {
    onChange({
      name,
      address_permanent: formatAddress(memberPermanentAddress),
      address_contact: formatAddress(memberContactAddress)
    });
  }, [name, memberPermanentAddress, memberContactAddress]);

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

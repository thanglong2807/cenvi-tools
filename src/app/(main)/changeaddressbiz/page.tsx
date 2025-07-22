'use client';
import React, { useEffect } from 'react'
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import axios from 'axios';
import { AddRef } from './addref/AddRef';
import Link from 'next/link';
import Members from './members/page';
import NewAddress from '@/app/components/Newaddress';

function ChangeAddressBiz() {

  const [companyType, setCompanyType] = useState('1');
  const [reps, setReps] = useState<any[]>([]);
  const [resultLink, setResultLink] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [companyMST, setCompanyMST] = useState('');
  const [companyAddressOld, setCompanyAddressOld] = useState('');
  const [ownerName, setOwnerName] = useState('');
  const [companyPhone, setCompanyPhone] = useState('');
  const [companyEmail, setCompanyEmail] = useState('');
  const [members, setMembers] = useState([
    {
      name: '',
      address_permanent: '',
      address_contact: ''
    }
  ]);
  
  const [ownerAddressPermanent, setOwnerAddressPermanent] = useState({
    provinceCode: '',
    wardCode: '',
    detail: ''
  });

  const [ownerAddressContact, setOwnerAddressContact] = useState({
    provinceCode: '',
    wardCode: '',
    detail: ''
  });
  const [newCompanyAddress, setNewCompanyAddress] = useState({
    provinceCode: '',
    wardCode: '',
    detail: ''
  });

  useEffect(() => {
    setResultLink('')
  }, []);
  const dataCompanyType = [
    { value: '1', label: 'MỘT THÀNH VIÊN' },
    { value: '2', label: 'HAI THÀNH VIÊN' },
    { value: '3', label: 'CỔ PHẦN' },
  ]

  const addRep = () =>
    setReps([
      ...reps,
      { name: '', gender: 0, position: '', address_permanent: '', address_contact: '', email: '', phone: '' }
    ]);
  const getApiEndpoint = (type: string) => {
    switch (type) {
      case '1': return 'https://changeaddressbiz.onrender.com/api/create/llc1';
      case '2': return 'https://changeaddressbiz.onrender.com/api/create/llc2';
      case '3': return 'https://changeaddressbiz.onrender.com/api/create/jsc';
      default: return '';
    }
  };

  const formatAddress = (addr: { provinceCode: string, wardCode: string, detail: string }) =>
    [addr.detail, addr.wardCode, addr.provinceCode].filter(Boolean).join(', ');

  const getMembersPayload = () => members.map(m => ({
  name: m.name,
  address_permanent: m.address_permanent ?? '',
  address_contact: m.address_contact ?? ''
}));


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload: any = {
      type: parseInt(companyType),
      company: {
        name: companyName,
        mst: companyMST,
        phone: companyPhone,
        email: companyEmail,
        address_old: companyAddressOld,
        address_new: {
          province: newCompanyAddress.provinceCode,
          ward: newCompanyAddress.wardCode,
          street: newCompanyAddress.detail
        }
      },
      representatives: reps
    };

    if (companyType === '1') {
      payload.owner = {
        name: ownerName,
        address_permanent: formatAddress(ownerAddressPermanent),
        address_contact: formatAddress(ownerAddressContact)
      };
    }
    if (companyType === '2') {
      payload.members = getMembersPayload();
      delete payload.owner;
    }
    // companyType === '3' giữ nguyên, không thêm owner, members
    console.log(payload);

    const token = localStorage.getItem('api_token');
    setResultLink('');
    try {
      const endpoint = getApiEndpoint(companyType);
      const res = await axios.post(endpoint, payload, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      });
      if (!res.data) throw new Error('Lỗi khi gửi dữ liệu.');
      if(res.data.message==='Folder already exists'){
        alert('Folder already exists');
        return;
      }
      
      setResultLink(res.data.folder_id);
    } catch {
      alert('Có lỗi xảy ra. Vui lòng thử lại.');
      setResultLink('');
    }
  };

  return (
    <div className="mt-20 pb-40  p-6 rounded shadow-2xl">
      <form className="flex flex-col gap-4 " onSubmit={handleSubmit}>
        {/* Thông tin công ty */}

        <div className="flex flex-col gap-4 border p-4 rounded shadow" >

          <div className='flex  gap-4'>
            <div className="flex flex-1 flex-col gap-4">
              <Label>Loại hình công ty</Label>
              <Select value={companyType} onValueChange={val => setCompanyType(val)}>
                <SelectTrigger className='w-full'>
                  <SelectValue placeholder="Chọn loại hình công ty" />
                </SelectTrigger>
                <SelectContent>
                  {dataCompanyType.map((p) => (
                    <SelectItem key={p.value} value={String(p.value)}>{p.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-1 flex-col gap-4">
              <Label>Tên công ty</Label>
              <Input
                className="bg-white"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                onBlur={(e) => setCompanyName(e.target.value.toUpperCase())}
              />
            </div>
            <div className="flex flex-1 flex-col gap-4">
              <Label>Mã số thuế</Label>
              <Input
                className="bg-white"
                maxLength={10}
                value={companyMST}
                onChange={(e) => setCompanyMST(e.target.value)}
              />
            </div>
          </div>
          <div className='flex gap-4'>
            <div className="mb-3 flex flex-col flex-1 gap-4">
              <Label>Số điện thoại</Label>
              <Input
                className="bg-white"
                maxLength={10}
                placeholder='Nhập số điện thoại'
                value={companyPhone}
                onChange={(e) => setCompanyPhone(e.target.value)}
              />
            </div>
            <div className="mb-3 flex flex-col flex-1 gap-4">
              <Label>Email</Label>
              <Input
                type='email'
                placeholder='Nhập email'
                className="bg-white"
                value={companyEmail}
                onChange={(e) => setCompanyEmail(e.target.value)}
              />
            </div>
          </div>
          <div className="mb-3 flex flex-col gap-4">
            <Label>Địa chỉ trụ sở cũ</Label>
            <Input
              className="bg-white"
              value={companyAddressOld}
              placeholder='Nhập rõ địa chỉ chi tiết, phường/xã, tỉnh/thành phố'
              onChange={(e) => setCompanyAddressOld(e.target.value)}
            />
          </div>
          <Label>Địa chỉ trụ sở mới</Label>
          <NewAddress value={newCompanyAddress} onChange={setNewCompanyAddress} />
        </div>

        {/* Thông tin chủ sở hữu */}
        {companyType == '1' ? <div className="mb-4 flex flex-col gap-2 border p-4 rounded shadow">
          <Label>Chủ sở hữu</Label>
          <Input
            className="bg-white mb-2"
            placeholder="Tên chủ sở hữu"
            value={ownerName}
            onChange={(e) => setOwnerName(e.target.value)}
          />
          <Label>Địa chỉ thường trú mới</Label>
          <NewAddress value={ownerAddressPermanent} onChange={setOwnerAddressPermanent} />
          <Label>Địa chỉ liên lạc mới</Label>
          <NewAddress value={ownerAddressContact} onChange={setOwnerAddressContact} />
        </div> : null}



        <div className="mb-4 flex flex-col gap-3 border p-4 rounded shadow">

          <div className="mb-4 flex flex-col gap-3 border p-4 rounded shadow">
            <Label>Người đại diện pháp luật</Label>

            {(companyType === '1' || companyType === '2' || companyType === '3') && (
              <>
                {reps.map((rep, idx) => (
                  <AddRef
                    key={idx}
                    idx={idx}
                    rep={rep}
                    setReps={setReps}
                    reps={reps}
                    ownerName={ownerName}
                    ownerAddressPermanent={formatAddress(ownerAddressPermanent)}
                    ownerAddressContact={formatAddress(ownerAddressContact)}
                    ownerPhone={companyPhone}
                    ownerEmail={companyEmail}
                  />
                ))}
                <Button className="cursor-pointer" type="button" variant="secondary" onClick={addRep}>
                  + Thêm người đại diện
                </Button>
              </>
            )}

            {companyType === '2' && (
              <Members
                ownerName={ownerName}
                onChange={(data: any[]) => {
                  setMembers(data);
                }}
              />
            )}

          </div>
        </div>
        <Button type="submit" className="w-full cursor-pointer">Tạo hồ sơ</Button>
      </form>

      {resultLink && (
        <div className="mt-4 flex items-center gap-2 justify-center border p-4 rounded shadow ">
          <h5>Link Drive:</h5>
          {
            resultLink === '' ? (<span>⏳ Đang tạo...</span>) : (
              <Link href={resultLink} target="_blank" rel="noopener noreferrer" className="text-amber-400 cursor-pointer">
                Click vào đây để xem hồ sơ
              </Link>
            )
          }
        </div>
      )}

    </div>
  )
}

export default ChangeAddressBiz
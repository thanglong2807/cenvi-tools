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

function ChangeAddressBiz() {

  const [token, setToken] = useState('');
  const [companyType, setCompanyType] = useState('1');
  const [province, setProvince] = useState('');
  const [ward, setWard] = useState('');
  const [provinceList, setProvinceList] = useState<any[]>([]);
  const [wardList, setWardList] = useState<any[]>([]);
  const [reps, setReps] = useState<any[]>([]);
  const [resultLink, setResultLink] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [companyMST, setCompanyMST] = useState('');
  const [companyAddressOld, setCompanyAddressOld] = useState('');
  const [companyStreet, setCompanyStreet] = useState('');
  const [ownerName, setOwnerName] = useState('');
  const [ownerAddressPermanent, setOwnerAddressPermanent] = useState('');
  const [ownerAddressContact, setOwnerAddressContact] = useState('');
  const provinceAPI = process.env.NEXT_PUBLIC_API_PROVICE;
  useEffect(() => {
    const fetchData = async () => {
      const savedToken = localStorage.getItem('api_token');
      if (savedToken) setToken(savedToken);
      const res = await axios.get(provinceAPI ?? '');
      setProvinceList(res.data.data || []);
    };
    fetchData();
  }, [provinceAPI]);
  const dataCompanyType = [
    { value: '1', label: 'Công ty TNHH' },
    { value: '2', label: 'Công ty Cổ phần' },
    { value: '3', label: 'Doanh nghiệp tư nhân' },
  ]
  useEffect(() => {
  const wardAPI = (code: string) => `${provinceAPI}/${code}/wards`;

    if (province) {
      axios.get(wardAPI(province))
        .then(res => setWardList(res.data.data || []));
    }
  }, [province]);

  const addRep = () =>
    setReps([
      ...reps,
      { name: '', gender: 0, position: '', address_permanent: '', address_contact: '' }
    ]);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      type: parseInt(companyType),
      company: {
        name: companyName,
        mst: companyMST,
        address_old: companyAddressOld,
        address_new: {
          province: province,
          ward: ward,
          street: companyStreet
        }
      },
      owner: {
        name: ownerName,
        address_permanent: ownerAddressPermanent,
        address_contact: ownerAddressContact
      },
      representative: reps
    };

    if (!confirm('Xác nhận tạo file?')) return;

    setResultLink('⏳ Đang tạo...');
    console.log(token);
    try {
      const res = await axios.post(
        process.env.NEXT_PUBLIC_API_CHANGEADDRESSBIZ ?? "",
        payload,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          }
        }
      );
      if (!res.data) throw new Error('Lỗi khi gửi dữ liệu.');

      setResultLink(res.data.folder_id);
    } catch {
      alert('Có lỗi xảy ra. Vui lòng thử lại.');
      setResultLink('');
    }
  };

  return (
    <div className="mt-20 pb-40  p-6 rounded shadow">
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
          <div className="mb-3 flex flex-col gap-4">
            <Label>Địa chỉ cũ</Label>
            <Input
              className="bg-white"
              value={companyAddressOld}
              onChange={(e) => setCompanyAddressOld(e.target.value)}
            />
          </div>
          <div className='flex gap-4'>
            <div className="flex flex-1 flex-col gap-4">
              <Label>Tỉnh/Thành phố</Label>
              <Select value={province} onValueChange={val => setProvince(val)}>
                <SelectTrigger className='w-full'>
                  <SelectValue placeholder="Chọn tỉnh" />
                </SelectTrigger>
                <SelectContent>
                  {provinceList.map((p) => (
                    <SelectItem key={p.code} value={String(p.code)}>{p.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

            </div>
            <div className="flex flex-1 flex-col gap-4">
              <Label>Phường/Xã</Label>
              <Select value={ward} onValueChange={(val) => setWard(val)}>
                <SelectTrigger className='w-full'><SelectValue placeholder="Chọn huyện" /></SelectTrigger>
                <SelectContent>
                  {wardList.map((w) => (
                    <SelectItem key={w.code} value={String(w.code)}>{w.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="mb-3 flex flex-col gap-4">
            <Label>Địa chỉ đường</Label>
            <Input
              className="bg-white"
              value={companyStreet}
              onChange={(e) => setCompanyStreet(e.target.value)}
            />
          </div></div>

        {/* Thông tin chủ sở hữu */}
        <div className="mb-4 flex flex-col gap-2 border p-4 rounded shadow">
          <Label>Chủ sở hữu</Label>
          <Input
            className="bg-white mb-2"
            placeholder="Tên chủ sở hữu"
            value={ownerName}
            onChange={(e) => setOwnerName(e.target.value)}
          />
          <Input
            className="bg-white mb-2"
            placeholder="Địa chỉ thường trú"
            value={ownerAddressPermanent}
            onChange={(e) => setOwnerAddressPermanent(e.target.value)}
          />
          <Input
            className="bg-white"
            placeholder="Địa chỉ liên lạc"
            value={ownerAddressContact}
            onChange={(e) => setOwnerAddressContact(e.target.value)}
          />
        </div>

        {/* Người đại diện */}
        <div className="mb-4 flex flex-col gap-3 border p-4 rounded shadow">
          <Label>Người đại diện pháp luật</Label>
          {reps.map((rep, idx) => (
            <AddRef
              key={idx}
              idx={idx}
              rep={rep}
              setReps={setReps}
              reps={reps}
              ownerName={ownerName}
              ownerAddressPermanent={ownerAddressPermanent}
              ownerAddressContact={ownerAddressContact}
            />
          ))}

          <Button className="cursor-pointer" type="button" variant="secondary" onClick={addRep}>+ Thêm người đại diện</Button>
        </div>

        <Button type="submit" className="w-full cursor-pointer">Tạo hồ sơ</Button>
      </form>

      {resultLink && (
        <div className="mt-4 flex items-center gap-2 justify-center border p-4 rounded shadow ">
          <h5>Link Drive:</h5>
          <Link href={resultLink} target="_blank" rel="noopener noreferrer" className="text-amber-400 cursor-pointer">
            Click vào đây để xem hồ sơ
          </Link>
        </div>
      )}
    </div>
  )
}

export default ChangeAddressBiz
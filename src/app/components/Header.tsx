'use client'
import React, { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";

const Header = () => {
  const [tokenVisible, setTokenVisible] = useState(false);
  const [token, setToken] = useState('');
  const [isDark, setIsDark] = useState(false);
  const [apiToken, setApiToken] = useState('');
  // Sync dark mode with localStorage and OS
  React.useEffect(() => {
    const saved = localStorage.getItem('theme');
    if (saved === 'dark' || (!saved && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.documentElement.classList.add('dark');
      setIsDark(true);
    } else {
      document.documentElement.classList.remove('dark');
      setIsDark(false);
    }
    ;
    setApiToken(localStorage.getItem('api_token') || '');
  }, []);

  const toggleDark = () => {
    const next = !isDark;
    setIsDark(next);
    if (next) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  return (
    <header className=" p-4 fixed w-full  border-b border-gray-300 flex justify-center  dark:bg-black dark:border-gray-700 dark:text-white">
      <div className="flex items-center justify-between container">
        <h1 className="text-2xl text-amber-400 font-bold">Cenvi Tools</h1>
      <ul className="flex gap-4 list-none">
        <li>
          <Link href="/changeaddressbiz" className=" hover:underline dark:text-amber-300">Thay đổi địa chỉ</Link>
        </li>
        <li>
          <Link href="/checkduplicate" className="hover:underline dark:text-amber-300">Kiểm tra trùng</Link>
        </li>
        <li>
          <Link href="/changetaxcode" className="hover:underline dark:text-amber-300">Thay đổi mã số thuế</Link>
        </li>
        <li>
          <Link href="/businessstatus" className="hover:underline dark:text-amber-300">Tình trạng doanh nghiệp</Link>
        </li>
      </ul>
      <div className="flex gap-2 items-center">
        <Button variant="outline" size="sm" onClick={toggleDark} aria-label="Toggle dark mode">
          {isDark ? '🌞' : '🌙'}
        </Button>
        <Button variant="outline" size="sm" onClick={() => setTokenVisible(!tokenVisible)}>🔐 Token</Button>
      {tokenVisible && (
          <div className="flex gap-2  items-center">
            <Input value={apiToken || token} onChange={e => setToken(e.target.value)} placeholder="Nhập token..." className="w-40 bg-white" />
            {
              apiToken ? (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setTokenVisible(false)
                  }}>
                  <Image src="/close.png" alt="close" width={12} height={12} className="" />
                </Button>
              ) : (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    localStorage.setItem('api_token', token);
                    alert('Đã lưu token');
                    setTokenVisible(false)
                  }}>
                  Lưu
                </Button>
              )
            }
          </div>
        )}</div>
      </div>
    </header>
  );
};

export default React.memo(Header);

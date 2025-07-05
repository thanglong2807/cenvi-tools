import Image from "next/image";

import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 gap-8 sm:p-20">
      <h1 className="text-4xl font-bold mb-4">Chào mừng đến với Cenvi Tools</h1>
      <p className="mb-8 text-lg text-gray-600 dark:text-gray-300">Chọn một chức năng để bắt đầu:</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-3xl">
        <FeatureCard
          title="Thay đổi địa chỉ doanh nghiệp"
          description="Cập nhật địa chỉ mới cho doanh nghiệp một cách nhanh chóng."
          href="/changeaddressbiz"
        />
        <FeatureCard
          title="Kiểm tra trùng doanh nghiệp"
          description="Kiểm tra các doanh nghiệp có thông tin trùng lặp."
          href="/checkduplicate"
        />
        <FeatureCard
          title="Thay đổi mã số thuế"
          description="Cập nhật mã số thuế mới cho doanh nghiệp."
          href="/changetaxcode"
        />
        <FeatureCard
          title="Tình trạng doanh nghiệp"
          description="Xem tình trạng hoạt động của doanh nghiệp."
          href="/businessstatus"
        />
      </div>
    </div>
  );
}

function FeatureCard({ title, description, href }: { title: string; description: string; href: string }) {
  return (
    <div className="bg-white dark:bg-gray-900 rounded-lg shadow-md p-6 flex flex-col items-start border border-gray-200 dark:border-gray-700">
      <h2 className="text-xl font-semibold mb-2">{title}</h2>
      <p className="mb-4 text-gray-600 dark:text-gray-300">{description}</p>
      <Link href={href} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">Truy cập</Link>
    </div>
  );
}


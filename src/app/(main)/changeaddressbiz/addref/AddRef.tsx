import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';

interface Rep {
    name: string;
    gender: number;
    position: string;
    address_permanent: string;
    address_contact: string;
    email: string;
    phone: string
}

interface AddRefProps {
    rep: Rep;
    idx: number;
    setReps: React.Dispatch<React.SetStateAction<Rep[]>>;
    reps: Rep[];
    email?: string;
    phone?: string;
    ownerName?: string; 
    ownerAddressPermanent?: string;
    ownerAddressContact?: string;
    ownerPhone?: string;
    ownerEmail?: string;
}
const dataPositions = [
    { id: uuidv4(), name: "Giám đốc" },
    { id: uuidv4(), name: "Tổng giám đốc" },
    { id: uuidv4(), name: "Phó Giám đốc" },
    { id: uuidv4(), name: "Phó Tổng giám đốc" },
    { id: uuidv4(), name: "Chủ tịch Công ty" },
    { id: uuidv4(), name: "Trưởng phòng kinh doanh" },
    { id: uuidv4(), name: "Kế toán trưởng" },
    { id: uuidv4(), name: "Phó Tổng giám đốc thứ nhất" },
    { id: uuidv4(), name: "Thành viên Hội đồng quản trị" },
    { id: uuidv4(), name: "Quyền Giám đốc" },
    { id: uuidv4(), name: "Chủ tịch HĐTV kiêm Tổng Giám đốc" },
    { id: uuidv4(), name: "Giám đốc Bán hàng và Tiếp thị" },
    { id: uuidv4(), name: "Chủ tịch Hội đồng thành viên kiêm Phó Tổng giám đốc" },
    { id: uuidv4(), name: "Trưởng phòng sản xuất" },
    { id: uuidv4(), name: "Giám đốc bộ phận nhà hàng và dịch vụ ăn uống" },
    { id: uuidv4(), name: "Chủ tịch HĐTV kiêm Giám đốc" },
    { id: uuidv4(), name: "Quyền Tổng giám đốc" },
    { id: uuidv4(), name: "Giám đốc kỹ thuật" },
    { id: uuidv4(), name: "Giám đốc phát triển doanh nghiệp" },
    { id: uuidv4(), name: "Chuyên gia tư vấn tài chính" },
    { id: uuidv4(), name: "Phó Chủ tịch hội đồng quản trị kiêm Tổng Giám đốc" },
    { id: uuidv4(), name: "Giám đốc bán hàng" },
    { id: uuidv4(), name: "Kiểm soát tài chính" },
    { id: uuidv4(), name: "Chuyên gia thiết kế sản phẩm và dịch vụ" },
    { id: uuidv4(), name: "Giám đốc nhà máy" },
    { id: uuidv4(), name: "Chủ tịch Hội đồng quản trị kiêm Phó Tổng giám đốc" },
    { id: uuidv4(), name: "Thành viên hội đồng thành viên kiêm Giám đốc" },
    { id: uuidv4(), name: "Phó Chủ tịch hội đồng quản trị kiêm Giám đốc" },
    { id: uuidv4(), name: "Trưởng Phòng Marketing" },
    { id: uuidv4(), name: "Chủ tịch Hội đồng thành viên kiêm Giám đốc tài chính" },
    { id: uuidv4(), name: "Chuyên gia thiết kế sản phẩm và dịch vụ" },
    { id: uuidv4(), name: "Giám đốc nhà máy" },
    { id: uuidv4(), name: "Chủ tịch Hội đồng quản trị kiêm Phó Tổng giám đốc" },
    { id: uuidv4(), name: "Thành viên hội đồng thành viên kiêm Giám đốc" },
    { id: uuidv4(), name: "Phó Chủ tịch hội đồng quản trị kiêm Giám đốc" },
    { id: uuidv4(), name: "Trưởng Phòng Marketing" },
    { id: uuidv4(), name: "Chủ tịch Hội đồng thành viên kiêm Giám đốc tài chính" },
    { id: uuidv4(), name: "Trợ lý Tổng giám đốc" },
    { id: uuidv4(), name: "Giám đốc sản xuất" },
    { id: uuidv4(), name: "Giám đốc nhân sự" },
    { id: uuidv4(), name: "Giám đốc kinh doanh" },
    { id: uuidv4(), name: "Giám đốc đại diện" },
    { id: uuidv4(), name: "Thành viên Hội đồng thành viên" },
    { id: uuidv4(), name: "Giám đốc điều hành" },
    { id: uuidv4(), name: "Giám đốc Kỹ thuật và Sản xuất" },
    { id: uuidv4(), name: "Thành viên Hội đồng thành viên kiêm Tổng giám đốc" },
    { id: uuidv4(), name: "Quyền Giám đốc" },
    { id: uuidv4(), name: "Giám đốc chiến lược" },
    { id: uuidv4(), name: "Tổng giám đốc điều hành" },
    { id: uuidv4(), name: "Quản lý dự án" },
    { id: uuidv4(), name: "Giám đốc tài chính" },
    { id: uuidv4(), name: "Tổng quản vụ" },
    { id: uuidv4(), name: "Chủ tịch Công Ty kiêm Giám Đốc Điều Hành" },
    { id: uuidv4(), name: "Chủ tịch HĐTV kiêm Tổng giám đốc" },
    { id: uuidv4(), name: "Quyền Chủ tịch công ty" },
    { id: uuidv4(), name: "Giám đốc đối ngoại" },
    { id: uuidv4(), name: "Phó chủ tịch hội đồng thành viên kiêm Phó giám đốc" },
    { id: uuidv4(), name: "Trưởng phòng Quản lý Hợp đồng" },
    { id: uuidv4(), name: "Phó Giám đốc Thường trực" },
    { id: uuidv4(), name: "Chủ tịch hội đồng thành viên kiêm Giám đốc điều hành" },
    { id: uuidv4(), name: "Giám đốc quản trị" },
    { id: uuidv4(), name: "Giám đốc Chuyển Đổi Vận Hành" },
    { id: uuidv4(), name: "Giám đốc pháp lý" },
    { id: uuidv4(), name: "Chủ tịch điều hành" },
    { id: uuidv4(), name: "Tổ trưởng kỹ thuật sản xuất linh kiện" },
    { id: uuidv4(), name: "Phụ trách quản lý, điều hành" },
    { id: uuidv4(), name: "Trưởng phòng phụ trách an ninh an toàn, phòng chống cháy nổ" },
    { id: uuidv4(), name: "Giám đốc phụ trách khu vực miền Bắc" },
    { id: uuidv4(), name: "Phó Tổng giám đốc tài chính" },
    { id: uuidv4(), name: "Giám đốc Thương mại, khối Sơn Bột Tĩnh Điện" },
    { id: uuidv4(), name: "Tổng Quản lý Hành chính và Kỹ thuật" },
    { id: uuidv4(), name: "Giám đốc chất lượng" },
    { id: uuidv4(), name: "Giám đốc hỗ trợ dịch vụ" },
    { id: uuidv4(), name: "Giám đốc chuỗi cung ứng và hành chính" },
    { id: uuidv4(), name: "Phó giám đốc sản xuất" },
    { id: uuidv4(), name: "Trợ lý Giám đốc" },
    { id: uuidv4(), name: "Quản lý tổng hợp" },
    { id: uuidv4(), name: "Phó Giám đốc Tài chính" },
    { id: uuidv4(), name: "Giám đốc điều hành khu vực miền Bắc" },
    { id: uuidv4(), name: "Trưởng phòng An toàn Phòng chống cháy nổ" },
    { id: uuidv4(), name: "Trưởng phòng An ninh An toàn Phòng chống cháy nổ" },
    { id: uuidv4(), name: "Trưởng phòng cấp cao Bộ phận Đầu tư và Quản lý tài sản" },
    { id: uuidv4(), name: "Giám đốc Phân tích kinh doanh" },
    { id: uuidv4(), name: "Giám đốc trung tâm ngoại ngữ" },
    { id: uuidv4(), name: "Giám đốc nhà máy sản xuất dao cạo râu" },
    { id: uuidv4(), name: "Phụ trách Hội đồng thành viên kiêm Tổng Giám đốc" },
    { id: uuidv4(), name: "Phụ trách giám đốc" },
    { id: uuidv4(), name: "Giám đốc Quản lý tổng hợp" },
    { id: uuidv4(), name: "Giám đốc Thương mại, khối Sơn Công Nghiệp" },
    { id: uuidv4(), name: "Giám đốc Thương mại, khối Sơn Chuyên Dụng" },
    { id: uuidv4(), name: "Ủy viên Pháp lý công ty" },
    { id: uuidv4(), name: "Chuyên gia tư vấn về đầu tư bất động sản" },
    { id: uuidv4(), name: "Chủ tịch Công ty kiêm Tổng Giám Đốc" },
    { id: uuidv4(), name: "Giám đốc Vận hành" },
    { id: uuidv4(), name: "Giám đốc Điều hành Nhà máy" },
    { id: uuidv4(), name: "Giám đốc phụ trách an ninh an toàn, phòng chống cháy nổ" },
    { id: uuidv4(), name: "Giám đốc xúc tiến phát triển dự án" },
    { id: uuidv4(), name: "Quản lý cao cấp" },
    { id: uuidv4(), name: "Giám đốc mua hàng" },
    { id: uuidv4(), name: "Phó Tổng Giám đốc Phụ trách" },
    { id: uuidv4(), name: "Trường phòng - Phòng Kế toán và Tổng vụ" },
    { id: uuidv4(), name: "Trưởng phòng - Phòng Kế toán và Tổng vụ" },
    { id: uuidv4(), name: "Giám đốc chuỗi cung ứng" },
    { id: uuidv4(), name: "Giám đốc hành chính" },
    { id: uuidv4(), name: "Chủ tịch Hội đồng quản trị kiêm Tổng Giám đốc" },
    { id: uuidv4(), name: "Chủ tịch Hội đồng thành viên kiêm Tổng Giám đốc" },
    { id: uuidv4(), name: "Chủ tịch Hội đồng thành viên kiêm Giám đốc" },
    { id: uuidv4(), name: "Chủ tịch hội đồng quản trị" },
    { id: uuidv4(), name: "Chủ tịch hội đồng thành viên" },
    { id: uuidv4(), name: "Chủ tịch công ty" },
    { id: uuidv4(), name: "Chủ doanh nghiệp tư nhân" },
    { id: uuidv4(), name: "Thành viên hợp danh" },
    { id: uuidv4(), name: "Chủ tịch công ty kiêm giám đốc" },
    { id: uuidv4(), name: "Chủ tịch kiêm Tổng giám đốc" },
    { id: uuidv4(), name: "Chủ tịch kiêm Giám đốc" },
    { id: uuidv4(), name: "Phó Chủ tịch hội đồng quản trị" },
    { id: uuidv4(), name: "Phó Chủ tịch hội đồng thành viên" },
    { id: uuidv4(), name: "Phó Chủ tịch công ty" },
    { id: uuidv4(), name: "Trưởng phòng" },
    { id: uuidv4(), name: "Phụ trách kế toán" },
  ];
  

export function AddRef({
    rep,
    idx,
    setReps,
    reps,
    ownerName = '',
    ownerAddressPermanent = '',
    ownerAddressContact = '',
    ownerPhone = '',
    ownerEmail = '',
}: AddRefProps) {
    const handleChange = (field: keyof Rep, value: string | number) => {
        if (reps[idx][field] === value) return; // Không đổi thì không set lại
        const newReps = [...reps];
        
        newReps[idx] = { ...newReps[idx], [field]: value };
        setReps(newReps);
    };
    const [positions, setPositions] = useState<any[]>([]);
    function removeDuplicateNames(arr: any[]) {
        const seen = new Set();
        return arr.filter((item: any) => {
          if (seen.has(item.name)) return false;
          seen.add(item.name);
          return true;
        });
      }
      
    useEffect(() => {
        setPositions(removeDuplicateNames(dataPositions));
        
    }, []);
    const handleSameOwner = (checked: boolean) => {
        if (checked) {
            if (
                rep.name === ownerName &&
                rep.address_permanent === ownerAddressPermanent &&
                rep.address_contact === ownerAddressContact && rep.email === ownerEmail && rep.phone === ownerPhone
            ) return;
            const newReps = [...reps];
            newReps[idx] = {
                ...newReps[idx],
                name: ownerName,
                email: ownerEmail,
                phone: ownerPhone,
                address_permanent: ownerAddressPermanent,
                address_contact: ownerAddressContact
            };
            setReps(newReps);
            console.log(newReps);
        } else {
            const newReps = [...reps];
            newReps[idx] = {
                ...newReps[idx],
                name: '',
                email: '',
                phone: '',
                address_permanent: '',
                address_contact: ''
            };
            setReps(newReps);
        }
    };

    const removeRep = () => {
        if (window.confirm('Bro có muốn xóa DDPL này á?')) {
            if (reps.length === 1) return; // Không xóa hết
            const newReps = [...reps];
            newReps.splice(idx, 1);
            setReps(newReps);
        }
    };

    return (
        <div className="position-relative rounded mb-3 rep-card">
            <div className="d-flex justify-content-between align-items-center mb-2">
                <div className="flex align-items-center gap-2 form-check m-0">
                    <Input
                        className=" w-5.5"
                        type="checkbox"
                        id={`sameOwner-${idx}`}
                        onChange={e => handleSameOwner(e.target.checked)}
                    />
                    <Label className="" htmlFor={`sameOwner-${idx}`}>
                        Giống chủ sở hữu
                    </Label>
                    <Button
                        className="w-5.5 bg-transparent"
                        onClick={removeRep}
                    >
                        ✖
                    </Button>
                </div>
            </div>
            <div className="flex  gap-4">
                <Input
                    className="mb-2 w-1/2"
                    placeholder="Tên người đại diện"
                    value={rep.name}
                    onChange={e => handleChange('name', e.target.value)}
                />
                <div className="row w-full mb-2 ">
                    <div className="col-6 w-full flex gap-3">
                        <Select value={rep.position} onValueChange={val => handleChange('position', val)}>
                            <SelectTrigger className='w-full'>
                                <SelectValue placeholder="Chức danh" />
                            </SelectTrigger>
                            <SelectContent>
                                {positions.map((pos: any) => (
                                    <SelectItem key={pos.id} value={pos.name}>{pos.name}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>

                        <Select
                            value={String(rep.gender)}
                            onValueChange={value => handleChange('gender', Number(value))}
                        >
                            <SelectTrigger className='w-full'>
                                <SelectValue placeholder="Giới tính" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="0">♂ Nam</SelectItem>
                                <SelectItem value="1">♀ Nữ</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
            </div>
            <div className="flex wrap mt-2 gap-4">
                <Input
                    type='email'
                    className=""
                    placeholder="Email"
                    value={rep.email}
                    onChange={e => handleChange('email', e.target.value)}
                />
                <Input
                    className='form-control mb-2'
                    placeholder="Số điện thoại"
                    value={rep.phone}
                    onChange={e => handleChange('phone', e.target.value)}
                />
                <Input
                    className=""
                    placeholder="Địa chỉ thường trú mới"
                    value={rep.address_permanent}
                    onChange={e => handleChange('address_permanent', e.target.value)}
                />
                <Input
                    className="form-control mb-2 rep-contact"
                    placeholder="Địa chỉ liên lạc mới"
                    value={rep.address_contact}
                    onChange={e => handleChange('address_contact', e.target.value)}
                />
            </div>
            
        </div>
    );
}
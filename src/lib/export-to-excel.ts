import * as XLSX from 'xlsx';
import { User } from '@/types/user';

export function exportUsersToExcel(users: User[]) {
  const worksheet = XLSX.utils.json_to_sheet(
    users.map((u) => ({
      ID: u._id,
      'Họ tên': u.fullname,
      Email: u.email,
      'Nhà cung cấp': u.provider,
      'Vai trò': u.role,
      'Xác minh': u.is_verified ? 'Đã xác minh' : 'Chưa xác minh',
      'Ngày tạo': new Date(u.created_at).toLocaleString('vi-VN'),
      'Ngày cập nhật': new Date(u.updated_at).toLocaleString('vi-VN')
    }))
  );

  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Danh sách người dùng');

  XLSX.writeFile(workbook, 'users.xlsx');
}

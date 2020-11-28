# CouchDB Tool thêm hàng loạt data V2.0

## 1. Tool gen data: https://github.com/marcosrivasr/json-generator

+ Điều kiện: Cài đặt NodeJs bản mới nhất (LTS)

## 2. Cách chạy tool:

+ Sau khi clone repo này về máy, di chuyển đến thư mục chứa repo và mở cmd. Sau đó type npm install để npm package tiến hành cài đặt các module cần thiết có trong dependencies của file package.json (gồm có thư viện couchdb-nano và module prompt dùng để lấy data cho bàn phím)

+ Sau khi đã cài xong các module, type vào cmd: node index.js để chạy chương trình. Đầu tiên sẽ là đường dẫn cho file data, ở đây đang cho mặc định là data/10M-6/1M-4 thì mới chạy được. Sau đó chọn số lượng thêm thì sẽ có 3 option (thêm 1.000.000, thêm 10.000.000 và thêm 3.000.000). Sau khi lựa chọn xong ngồi đợi chương trình thêm data vào couchdb. 

## 3. Một vài lưu ý: 

+ Code đang để mặc định là insert vào database có tên person. Nếu muốn tool chạy oke thì chỉnh sửa tên database trong hàm insertMultiPromise hoặc tạo một database có tên person.

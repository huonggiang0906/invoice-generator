/**
 * Chuyển đối số đầu vào thành chuỗi.
 * Lấy phần số từ chuỗi. Nếu không tìm thấy số, gán giá trị "0".
 * Lưu độ dài của phần số.
 * Tăng phần số lên 1.
 * Nếu có số 0 đằng trước, thêm chúng lại để duy trì độ dài ban đầu.
 * Thay thế phần số cũ trong chuỗi ban đầu bằng phần số mới đã được tăng giá trị.
 * @param {string} string Chuỗi đầu vào chứa chuỗi số cần tăng.
 * @returns {string} Chuỗi mới sau khi đã tăng giá trị chuỗi số.
 */
const incrementString = (string: string): string =>{
  const str = string.toString();
  let number = str.match(/\d+/) === null ? "0" : str.match(/\d+/)?.[0] || "";
  const numberLength = number.length;
  number = (parseInt(number) + 1).toString();
  while(number.length < numberLength){
    number = "0" + number;
  }
  return str.replace(/\d+/g, "").concat(number);
};

export default incrementString;

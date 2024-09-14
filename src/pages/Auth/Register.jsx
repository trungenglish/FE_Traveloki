import React, { useState } from "react";
import axios from "axios";

const SignUp = () => {
  const [username, setUserName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [dob, setDob] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSignUp = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setIsLoading(true);

    if (!firstName || !lastName || !email || !password || !confirmPassword) {
      setError("Vui lòng điền đầy đủ thông tin.");
      setIsLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      setError("Mật khẩu và xác nhận mật khẩu không khớp.");
      setIsLoading(false);
      return;
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Địa chỉ email không hợp lệ.");
      setIsLoading(false);
      return;
    }

    // Password strength validation
    if (password.length < 6) {
      setError("Mật khẩu phải có ít nhất 6 ký tự.");
      setIsLoading(false);
      return;
    }

    try {
      const response = await axios.post(
        "https://api.htilssu.com/api/v1/auth/register",
        {
          firstName,
          lastName,
          password,
          email,
          dob,
          phoneNumber,
        },
        {
          headers: {
            Authorization: `Bearer YOUR_API_TOKEN`,
          },
        }
      );

      if (response.status === 200) {
        setSuccess("Đăng ký thành công!");
        window.location.href = "/HomePage";
      } else {
        throw new Error("Network response was not ok");
      }
    } catch (e) {
      setError("Có lỗi xảy ra trong quá trình đăng ký. Vui lòng thử lại.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="flex items-center justify-center py-9 min-h-screen bg-center bg-cover"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1441260038675-7329ab4cc264?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8N3w4N3x8ZW58MHx8fHx8')",
      }}
    >
      <div className="w-full max-w-md p-6 mx-auto bg-white rounded-md shadow-md">
        <h2 className="mb-4 text-2xl font-bold text-center">Đăng Ký</h2>
        <form onSubmit={handleSignUp}>
          <div className="mb-4">
            <label className="block">
              <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
                Họ
              </span>
            </label>
            <input
              placeholder="Họ của bạn"
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block">
              <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
                Tên
              </span>
            </label>
            <input
              placeholder="Tên của bạn"
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block">
              <span className="block text-sm font-medium text-slate-700">
                Ngày sinh
              </span>
            </label>
            <input
              type="date"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
            />
          </div>
          <div className="mb-4">
            <label className="block">
              <span className="block text-sm font-medium text-slate-700">
                Số điện thoại
              </span>
            </label>
            <input
              type="tel"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
            />
          </div>
          <div className="mb-4">
            <label className="block">
              <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
                Email
              </span>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="block w-full px-3 py-2 mt-1 bg-white border rounded-md shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 sm:text-sm focus:ring-1"
                placeholder="you@example.com"
                required
              />
            </label>
          </div>
          <div className="mb-4">
            <label className="block">
              <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
                Mật khẩu
              </span>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="block w-full px-3 py-2 mt-1 bg-white border rounded-md shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 sm:text-sm focus:ring-1"
                placeholder="Mật khẩu của bạn"
                required
              />
            </label>
          </div>
          <div className="mb-4">
            <label className="block">
              <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
                Xác nhận mật khẩu
              </span>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="block w-full px-3 py-2 mt-1 bg-white border rounded-md shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 sm:text-sm focus:ring-1"
                placeholder="Xác nhận mật khẩu"
                required
              />
            </label>
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600"
            disabled={isLoading}
          >
            {isLoading ? "Đang đăng ký..." : "Đăng Ký"}
          </button>
          <p className="mt-4 text-sm text-center text-gray-600">
            Bạn đã có tài khoản?
            <a href="/" className="text-blue-500 hover:underline">
              Đăng nhập
            </a>
          </p>
        </form>
        {error && <p className="mb-4 text-center text-red-500">{error}</p>}
        {success && (
          <p className="mb-4 text-center text-green-500">{success}</p>
        )}
      </div>
    </div>
  );
};

export default SignUp;

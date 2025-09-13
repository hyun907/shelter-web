import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "@/shared/services/apis/api";

export function useAutoLogin(redirectPath = "/map") {
  const navigate = useNavigate();

  useEffect(() => {
    const checkLogin = async () => {
      try {
        await api.get("/info");
        navigate(redirectPath);
      } catch {
        console.error("자동 로그인 실패");
      }
    };

    checkLogin();
  }, []);
}

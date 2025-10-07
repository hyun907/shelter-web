import { useSearchParams } from "react-router-dom";
import type { NearbyShelterApiItem } from "@/features/shelter/schemas/shelter.schema";
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
import {
  MdPeople,
  MdSchedule,
  MdApartment,
  MdHotel,
  MdPowerSettingsNew,
  MdConfirmationNumber
} from "react-icons/md";
import Button from "@/common/components/button/Button";
import styles from "./ShelterDetail.module.css";
import Header from "@/common/components/header/Header";
import { formatTime } from "../utils/formatTime";
import { useNavigate } from "react-router-dom";

export default function ShelterDetail() {
  const [params] = useSearchParams();
  const shelterParam = params.get("shelter");
  const shelter: NearbyShelterApiItem | null = shelterParam ? JSON.parse(shelterParam) : null;

  const navigate = useNavigate();

  const onClick = () => {
    if (!isNaN(lat) && !isNaN(lng) && shelter) {
      const shelterName = encodeURIComponent(shelter.RSTR_NM);
      navigate(`/map?destLat=${lat}&destLng=${lng}&shelter=${shelterName}`);
    }
  };

  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY as string | undefined;
  const { isLoaded } = useLoadScript({ googleMapsApiKey: apiKey ?? "" });

  if (!shelter) return <div>쉼터 정보가 없습니다.</div>;
  if (!apiKey || !isLoaded) return <div>지도 로딩 중...</div>;

  const lat = typeof shelter.LA === "string" ? parseFloat(shelter.LA) : shelter.LA;
  const lng = typeof shelter.LO === "string" ? parseFloat(shelter.LO) : shelter.LO;

  if (isNaN(lat) || isNaN(lng)) {
    return <div>유효하지 않은 좌표 정보입니다.</div>;
  }

  return (
    <div className={styles.container}>
      <Header title="" />
      <div className={styles.body}>
        <div className={styles.mapContainer}>
          <GoogleMap
            mapContainerStyle={{ width: "100%", height: "100%" }}
            center={{ lat, lng }}
            zoom={17}
            options={{
              fullscreenControl: false,
              streetViewControl: false,
              mapTypeControl: false
            }}
          >
            <Marker
              position={{ lat, lng }}
              label={{
                text: "대피소",
                color: "#fff",
                fontSize: "11px",
                fontWeight: "bold"
              }}
              icon={{
                url:
                  "data:image/svg+xml;utf8," +
                  encodeURIComponent(`
                      <svg width="70" height="70" viewBox="0 0 70 70" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="35" cy="35" r="35" fill="#0844bdff" stroke="white" stroke-width="4"/>
                      </svg>
                    `),
                scaledSize: new window.google.maps.Size(40, 40)
              }}
            />
          </GoogleMap>
        </div>

        {/* 상세 정보 */}
        <div className={styles.detailSection}>
          <div>
            <h1 className={styles.title}>{shelter.RSTR_NM}</h1>
            <p className={styles.address}>{shelter.RN_DTL_ADRES || shelter.DTL_ADRES}</p>
          </div>

          {/* 수용 인원 */}
          <div className={styles.row}>
            <MdPeople style={{ color: "#000000ff", width: "24px", height: "24px" }} /> 최대{" "}
            {shelter.USE_PSBL_NMPR
              ? `${shelter.USE_PSBL_NMPR}명까지 수용 가능해요.`
              : "수용 가능 인원 정보가 없어요.🧐"}
          </div>

          {/* 운영 시간 */}
          <div className={styles.row}>
            <MdSchedule style={{ color: "#da7c66ff", width: "24px", height: "24px" }} /> 평일 운영
            시간은{" "}
            {shelter.WKDAY_OPER_BEGIN_TIME && shelter.WKDAY_OPER_END_TIME
              ? `${formatTime(shelter.WKDAY_OPER_BEGIN_TIME)} ~ ${formatTime(shelter.WKDAY_OPER_END_TIME)}예요.`
              : "정보가 없어요😅"}
          </div>

          <div className={styles.row}>
            <MdSchedule style={{ color: "#dabd2bff", width: "24px", height: "24px" }} /> 주말 운영
            시간은{" "}
            {shelter.WKEND_HDAY_OPER_BEGIN_TIME && shelter.WKEND_HDAY_OPER_END_TIME
              ? `${formatTime(shelter.WKEND_HDAY_OPER_BEGIN_TIME)} ~ ${formatTime(shelter.WKEND_HDAY_OPER_END_TIME)}예요.`
              : "아직 정보가 없어요.😅"}
          </div>

          {/* 숙박 가능 여부 */}
          <div className={styles.row}>
            <MdHotel style={{ color: "#6b6968ff", width: "24px", height: "24px" }} />
            숙박
            {shelter.CHCK_MATTER_STAYNG_PSBL_AT === "N" ? "은 불가능해요.😢" : " 가능해요!"}
          </div>

          {/* 보유 냉난방기 개수 */}
          <div className={styles.row}>
            <MdPowerSettingsNew style={{ color: "#0d39ffff", width: "24px", height: "24px" }} />
            {shelter.COLR_HOLD_ARCNDTN
              ? `냉/난방기는 ${shelter.COLR_HOLD_ARCNDTN}개 가동 중이에요.`
              : "냉/난방기 정보가 없어요.😓"}
          </div>

          {/* 면적 */}
          <div className={styles.row}>
            <MdApartment style={{ color: "#4b7278ff", width: "24px", height: "24px" }} /> 건물
            면적은 {shelter.AR ? `${shelter.AR}㎡ 이에요.` : "아직 정보가 없어요.😅"}
          </div>

          {/* 대피소 번호 */}
          <div className={styles.row}>
            <MdConfirmationNumber style={{ color: "#6a0dadff", width: "24px", height: "24px" }} />{" "}
            대피소 번호는 {shelter.RSTR_FCLTY_NO} 이에요.
          </div>
        </div>
      </div>
      <Button title="경로 보기" className={styles.routeButton} onClick={onClick} />;
    </div>
  );
}

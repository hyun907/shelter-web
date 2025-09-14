import { useSearchParams } from "react-router-dom";
import type { NearbyShelterApiItem } from "@/features/shelter/schemas/shelter.schema";
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
import { MdPeople, MdSchedule, MdApartment, MdInfo } from "react-icons/md";
import Button from "@/common/components/button/Button";
import styles from "./ShelterDetail.module.css";
import Header from "@/common/components/header/Header";
import { formatTime } from "../utils/formatTime";
import { formatDate } from "../utils/formatDate";

export default function ShelterDetail() {
  const [params] = useSearchParams();
  const shelterParam = params.get("shelter");
  const shelter: NearbyShelterApiItem | null = shelterParam ? JSON.parse(shelterParam) : null;

  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY as string | undefined;
  const { isLoaded } = useLoadScript({ googleMapsApiKey: apiKey ?? "" });

  if (!shelter) return <div>쉼터 정보가 없습니다.</div>;
  if (!apiKey || !isLoaded) return <div>지도 로딩 중...</div>;

  const onClick = () => console.log("경로보기");

  // 보조 정보: 비고나 시설분류
  const auxiliaryInfo = shelter.RMRK || shelter.FCLTY_SCLAS || "정보 없음";

  return (
    <div className={styles.container}>
      <Header title="" />
      <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
        <div className={styles.mapContainer}>
          <GoogleMap
            mapContainerStyle={{ width: "100%", height: "200px" }}
            center={{ lat: shelter.LAT, lng: shelter.LOT }}
            zoom={15}
            options={{
              fullscreenControl: false,
              streetViewControl: false,
              mapTypeControl: false
            }}
          >
            <Marker position={{ lat: shelter.LAT, lng: shelter.LOT }} />
          </GoogleMap>
        </div>

        {/* 상세 정보 */}
        <div className={styles.detailSection}>
          <div>
            <h1 className={styles.title}>{shelter.REARE_NM}</h1>
            <p className={styles.address}>{shelter.RONA_DADDR || shelter.DADDR}</p>
          </div>

          {/* 수용 인원 */}
          <div className={styles.row}>
            <MdPeople style={{ color: "#0c47bcff", width: "24px", height: "24px" }} /> 최대{" "}
            {shelter.UTZTN_PSBLTY_TNOP || "정보 없음"}명
          </div>

          {/* 운영 시간 */}
          <div className={styles.row}>
            <MdSchedule style={{ color: "#f0350bff", width: "24px", height: "24px" }} /> 평일 운영:{" "}
            {shelter.WKDY_OPER_BGNG_HR && shelter.WKDY_OPER_END_HR
              ? `${formatTime(shelter.WKDY_OPER_BGNG_HR)} ~ ${formatTime(shelter.WKDY_OPER_END_HR)}`
              : "정보 없음"}
          </div>

          <div className={styles.row}>
            <MdSchedule style={{ color: "#f5d32bff", width: "24px", height: "24px" }} /> 주말 운영:{" "}
            {shelter.SNDY_OPER_BGNG_HR && shelter.SNDY_OPER_END_HR
              ? `${formatTime(shelter.SNDY_OPER_BGNG_HR)} ~ ${formatTime(shelter.SNDY_OPER_END_HR)}`
              : "정보 없음"}
          </div>

          {/* 면적 */}
          <div className={styles.row}>
            <MdApartment style={{ color: "#4b7278ff", width: "24px", height: "24px" }} /> 면적:{" "}
            {shelter.FCLTY_SCLAS || "정보 없음"}㎡
          </div>

          {/* 추가 정보 */}
          <div className={styles.row}>
            <MdInfo style={{ color: "#ffa500ff", width: "24px", height: "24px" }} />
            추가 정보: {auxiliaryInfo}
          </div>

          {/* 대피소 번호 */}
          <div className={styles.row}>
            <MdInfo style={{ color: "#6a0dadff", width: "24px", height: "24px" }} /> 시설 고유 번호:{" "}
            {shelter.REARE_FCLT_NO}
          </div>

          {/* 마지막 수정 시간 */}
          <div className={styles.row}>
            <MdInfo style={{ color: "#228b22ff", width: "24px", height: "24px" }} />
            마지막 업데이트: {formatDate(shelter.MDFCN_HR)}
          </div>
        </div>
      </div>

      <Button title="경로 보기" className={styles.routeButton} onClick={onClick} />
    </div>
  );
}

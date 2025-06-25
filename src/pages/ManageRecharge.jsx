import { useContext, useEffect } from "react";
import Tittle from "../component/Tittle";
import { AppContext } from "../contex/Contex";
import axios from "axios";
import { backendUrl } from "../contex/Contex";

const ManageRecharge = () => {
  const { currency, rechargeHistory, setRechargeHistory } =
    useContext(AppContext);

  useEffect(() => {
    const fetchRechargeHistory = async () => {
      try {
        const response = await axios.get(
          `${backendUrl}/api/transactions/recharge-history`,
          {
            withCredentials: true,
          }
        );
        console.log("Response from backend:", response.data.rechargeHistory);
        if (response.data.success) {
          setRechargeHistory(response.data.rechargeHistory); // Update context with fetched history
        } else {
          console.error(
            "Failed to fetch recharge history:",
            response.data.message
          );
        }
      } catch (error) {
        console.error("Error fetching recharge history:", error);
      }
    };

    fetchRechargeHistory();
  }, [setRechargeHistory]);

  return (
    <div>
      <Tittle Tittle={"Manage Recharge"} />

      <div className="px-2">
        {rechargeHistory && rechargeHistory.length > 0 ? (
          rechargeHistory.map((record, index) => (
            <div
              key={index}
              className="flex justify-between items-center w-full border-b border-b-gray-300 py-4"
            >
              {/* Withdrawal record */}
              <div>
                <div className="flex flex-col gap-2">
                  <p
                    className={`text-${
                      record.status === "approved"
                        ? "green"
                        : record.status === "rejected"
                        ? "red"
                        : "yellow"
                    }-600`}
                  >
                    Recharge -{" "}
                    {(record.status || "No description")
                      .charAt(0)
                      .toUpperCase() + (record.status || "No ").slice(1)}
                  </p>
                  <p className="text-gray-400 text-sm">
                    {record.createdAt
                      ? new Date(record.createdAt).toLocaleString()
                      : "No date"}
                  </p>
                </div>
              </div>
              <div
                className={`text-${
                  record.status === "approved"
                    ? "green"
                    : record.status === "rejected"
                    ? "red"
                    : "yellow"
                }-600`}
              >
                <p>
                  - {currency} {record.amount}
                </p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-center mt-4">No withdrawals yet.</p>
        )}
      </div>
    </div>
  );
};

export default ManageRecharge;

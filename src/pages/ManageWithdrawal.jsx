import { useContext, useEffect } from "react";
import Tittle from "../component/Tittle";
import { AppContext } from "../contex/Contex";
import axios from "axios";
import { backendUrl } from "../contex/Contex";

const ManageWithdrawal = () => {
  const { currency, withdrawalHistory, setWithdrawalHistory } =
    useContext(AppContext);

  useEffect(() => {
    const fetchWithdrawalHistory = async () => {
      try {
        const response = await axios.get(
          `${backendUrl}/api/transactions/withdrawal-history`,
          {
            withCredentials: true,
          }
        );

        if (response.data.success) {
          setWithdrawalHistory(response.data.withdrawalHistory); // Update context with fetched history
        } else {
          console.error(
            "Failed to fetch withdrawal history:",
            response.data.message
          );
        }
      } catch (error) {
        console.error("Error fetching withdrawal history:", error);
      }
    };

    fetchWithdrawalHistory();
  }, [setWithdrawalHistory]);

  return (
    <div>
      <Tittle Tittle={"Manage Withdrawal"} />

      <div className="px-2 mt-5">
        {withdrawalHistory.length > 0 ? (
          withdrawalHistory.map((record, index) => (
            <div
              key={index}
              className="flex justify-between items-center w-full border-b border-b-gray-300 pb-4"
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
                    Withdrawal -{" "}
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

export default ManageWithdrawal;

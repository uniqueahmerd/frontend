import axios from "axios";
import { useContext, useState, useEffect } from "react";
import { AppContext } from "../contex/Contex";
import Tittle from "../component/Tittle";
import { backendUrl } from "../contex/Contex";

const Team = () => {
  const { referralCode, referralBonus, currency } = useContext(AppContext);
  const invitationLink = `https://yourdomain.com/register?ref=${referralCode}`;
  const [copied, setCopied] = useState(""); // Track which was copied
  const [invitedCount, setInvitedCount] = useState(0);

  useEffect(() => {
    const fetchInvitedCount = async () => {
      try {
        const res = await axios.get(`${backendUrl}/api/users/invited-count`, {
          withCredentials: true,
        });
        setInvitedCount(res.data.count);
      } catch (err) {
        console.error(err);
        setInvitedCount(0);
      }
    };
    fetchInvitedCount();
  }, []);

  const handleCopy = (text, type) => {
    navigator.clipboard.writeText(text);
    setCopied(type);
    setTimeout(() => setCopied(""), 1500); // Reset after 1.5s
  };

  return (
    <div className=" pb-22">
      <Tittle Tittle={"Referrals"} />

      <div className="flex flex-col gap-3 mt-3">
        <div className="bg-gray-200 py-2 flex justify-between items-center px-3">
          <div className="">
            <p className="font-semibold text-md">{referralCode}</p>
            <p className=" text-gray-500 text-sm">Invitation code</p>
          </div>

          <button
            onClick={() => handleCopy(referralCode, "code")}
            className="bg-blue-900 text-white py-2 px-5 rounded-md"
          >
            {copied === "code" ? "Copied" : "Copy"}
          </button>
        </div>

        <div className="bg-gray-200 py-2 flex justify-between items-center px-3">
          <div className="">
            <p className="font-semibold text-md">{invitationLink}</p>
            <p className=" text-gray-500 text-sm">Invitation link</p>
          </div>

          <button
            onClick={() => handleCopy(invitationLink, "link")}
            className="bg-blue-900 text-white py-2 px-5 rounded-md"
          >
            {copied === "link" ? "Copied" : "Copy"}
          </button>
        </div>
      </div>

      <div className="mt-1 pt-4 px-2 bg-white">
        <div className="flex gap-2 mb-2">
          <p className="w-1 h-6 bg-black"></p>
          <p>Referral Bonus</p>
          <p>
            <b>
              {currency} {referralBonus}
            </b>
          </p>
        </div>
        <div className="flex gap-2 mb-2">
          <p className="w-1 h-6 bg-black"></p>
          <p>Total Invited:</p>
          <p>
            <b>{invitedCount}</b>
          </p>
        </div>
        <div className="text-sm text-gray-500 flex flex-col gap-1">
          <p>- Share your referral code or link with friends.</p>
          <p>- Earn rewards when they sign up and make their first purchase.</p>
          <p>
            - You can share your referral code or link on social media,
            messaging apps, or directly with friends.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Team;

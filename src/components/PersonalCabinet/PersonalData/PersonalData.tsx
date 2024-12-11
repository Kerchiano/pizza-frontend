import { useSelector } from "react-redux";
import { RootState } from "../../../store";
import {
  useGetUserAddressesQuery,
  useGetUserDetailsQuery,
  useRemoveAddressMutation,
} from "../../../authApi";
import ChangeUserDataForm from "../../forms/UserDetailForm/ChangeUserDataForm";
import AddressItem from "./AddressItem";
import AddAddress from "./AddAddress/AddAddress";

const PersonalData = () => {
  const token = useSelector((state: RootState) => state.auth.accessToken);
  const [removeAddress] = useRemoveAddressMutation();

  const { data: userDetails, isLoading } = useGetUserDetailsQuery(undefined, {
    skip: !token,
  });

  const { data: addressesData, isLoading: addressIsLoading } =
    useGetUserAddressesQuery(userDetails?.id || 0, {
      skip: !userDetails?.id,
    });

  const handleDeleteAddress = (id: number) => {
    removeAddress(id);
  };

  return (
    <div className="data-container">
      <div className="form-title">Дані користувача:</div>
      <ChangeUserDataForm isLoading={isLoading} userDetails={userDetails} />
      <div className="delivery-addresses">
        <div className="title">Адреси доставки:</div>
        <div className="old-address">
          {isLoading || addressIsLoading ? (
            <div
              className="w-[150px] h-[150px] border-[16px] border-t-transparent border-green-500 rounded-full animate-spin m-auto my-4"
              role="status"
            ></div>
          ) : addressesData && addressesData.length > 0 ? (
            addressesData.map((address) => (
              <AddressItem
                key={address.id}
                address={address}
                onDelete={() => handleDeleteAddress(address.id)}
              />
            ))
          ) : (
            <div className="not-address">Нема адрес для відображення</div>
          )}
        </div>
        <AddAddress user={userDetails?.id || 0} />
      </div>
    </div>
  );
};

export default PersonalData;

import { useSelector } from "react-redux";
import { RootState } from "../store";
import {
  useGetUserAddressesQuery,
  useGetUserDetailsQuery,
  useRemoveAddressMutation,
} from "../authApi";
import ChangeUserDataForm from "../components/ChangeUserDataForm";
import AddressItem, { Address } from "./AddressItem";
import AddAddress from "./AddAddress";
import { useEffect, useState } from "react";

const PersonalData = () => {
  const token = useSelector((state: RootState) => state.auth.accessToken);
  const [removeAddress] = useRemoveAddressMutation();
  const { data: userDetails, refetch: refetchUserDetails } =
    useGetUserDetailsQuery(undefined, {
      skip: !token,
    });

  const { data: addressesData, refetch: refetchUserAddresses } =
    useGetUserAddressesQuery(userDetails?.email || "", {
      skip: !userDetails?.email,
    });

  const [addresses, setAddresses] = useState<Address[]>([]);

  useEffect(() => {
    if (addressesData) {
      setAddresses(addressesData);
    }
  }, [addressesData]);

  const handleDeleteAddress = (id: number) => {
    removeAddress(id);
    setAddresses((prevAddresses) =>
      prevAddresses.filter((address) => address.id !== id)
    );
  };

  const handleAddAddress = (newAddress: Address) => {
    setAddresses((prevAddresses) => [...prevAddresses, newAddress]);
  };

  useEffect(() => {
    if (token) {
      if (refetchUserDetails) {
        refetchUserDetails();
      }
    }
  }, [token, refetchUserDetails]);

  useEffect(() => {
    if (userDetails?.email && refetchUserAddresses) {
      refetchUserAddresses();
    }
  }, [userDetails, refetchUserAddresses]);

  return (
    <div className="data-container">
      <div className="form-title">Дані користувача:</div>
      {userDetails && <ChangeUserDataForm userDetails={userDetails} />}
      <div className="delivery-addresses">
        <div className="title">Адреси доставки:</div>
        <div className="old-address">
          {addresses && addresses.length > 0 ? (
            addresses.map((address) => (
              <AddressItem
                key={address.id}
                address={address}
                onDelete={() => handleDeleteAddress(address.id)}
              />
            ))
          ) : (
            <div className="not-address">Нет адресов для отображения</div>
          )}
        </div>
        <AddAddress
          user={userDetails?.email || ""}
          onAddAddress={handleAddAddress}
        />
      </div>
    </div>
  );
};

export default PersonalData;

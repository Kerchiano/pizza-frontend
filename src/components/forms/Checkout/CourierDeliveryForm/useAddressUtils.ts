import { Address } from "../../../PersonalCabinet/PersonalData/AddressItem";

export const useAddressUtils = (addresses: Address[]) => {
  const CITY_CHOICES: { [key: string]: string } = {
    K: "Київ",
    Kh: "Харків",
    D: "Дніпро",
    M: "Миколаїв",
  };

  const options = addresses.map((address: Address) => ({
    value: address.id,
    label: `м.${CITY_CHOICES[address.city]} вул.${address.street} буд.${
      address.house_number
    } під'їзд ${address.floor} этаж ${address.entrance} кв.${address.flat}`,
  }));

  const choiceAddress = (addressId: number, setFieldValue: Function) => {
    const foundAddress = addresses.find((address) => address.id === addressId);
    if (foundAddress) {
      setFieldValue("city", foundAddress.city);
      setFieldValue("street", foundAddress.street);
      setFieldValue("house_number", foundAddress.house_number);
      setFieldValue("floor", foundAddress.floor);
      setFieldValue("entrance", foundAddress.entrance);
      setFieldValue("flat", foundAddress.flat);
    }
  };

  return { options, choiceAddress };
};

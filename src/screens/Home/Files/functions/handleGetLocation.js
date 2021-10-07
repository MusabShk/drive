import * as Location from "expo-location";

const handleGetLocation = async () => {
  try {
    const response = await Location.requestPermissionsAsync();
    if (response.granted) {
      const status = await Location.hasServicesEnabledAsync();
      if (status) {
        const getCurrentPosition = async () =>
          await Location.getCurrentPositionAsync()
            .then((loc) => loc)
            .catch((_) => null);

        let location = await getCurrentPosition();
        while (location === null) {
          location = await getCurrentPosition();
        }

        if (location) {
          const { latitude, longitude } = location.coords;
          const postalAddress = await Location.reverseGeocodeAsync({
            latitude,
            longitude,
          });

          const district = postalAddress[0].district;
          const city = postalAddress[0].city;

          return `${district}, ${city}`;
        }
      }
    }

    return null;
  } catch (e) {
    console.log(e);
    return null;
  }
};

export default handleGetLocation;

// export default async function getLocation() {
//     await Location.enableNetworkProviderAsync().then().catch(_ => null);
//     const status = await Location.hasServicesEnabledAsync();
//     if(status){
//       const getCurrentPosition = async () => await Location.getCurrentPositionAsync()
//                                         .then(loc => loc)
//                                         .catch(_ => null)
//       let location = await getCurrentPosition();
//       while(location === null){
//         location = await getCurrentPosition();
//       }
//       return location;
//     }else{
//       throw new Error("Please activate the location");
//     }
//   }


import { createContext, useContext, useEffect, useState } from "react";
import { axiosReq, axiosRes } from "../api/axiosDefaults";
import { useCurrentUser } from "../contexts/CurrentUserContext";
import { followHelper, unfollowHelper } from "../utils/utils";

const ProfileDataContext = createContext();
const SetProfileDataContext = createContext();

export const useProfileData = () => useContext(ProfileDataContext);
export const useSetProfileData = () => useContext(SetProfileDataContext);

export const ProfileDataProvider = ({ children }) => {
    const [profileData, setProfileData] = useState({
      pageProfile: { results: [] },
      popularProfiles: { results: [] },
      followers_count: 0,
    });
  
    const currentUser = useCurrentUser();
  
    const handleFollow = async (clickedProfile) => {
        try {
          const { data } = await axiosRes.post("/followers/", {
            followed: clickedProfile.id,
          });
      
          console.log("Data from follow API:", data);
      
          setProfileData((prevState) => ({
            ...prevState,
            pageProfile: {
              results: prevState.pageProfile.results.map((profile) =>
                followHelper(profile, clickedProfile, data.id)
              ),
            },
            followers_count: prevState.followers_count + 1,
            popularProfiles: {
              ...prevState.popularProfiles,
              results: prevState.popularProfiles.results.map((profile) =>
                followHelper(profile, clickedProfile, data.id)
              ),
            },
          }));
        } catch (err) {
          console.log(err);
        }
      }
  const handleUnfollow = async (clickedProfile) => {
    try {
        await axiosRes.delete(`/followers/${clickedProfile.following_id}/`);

    setProfileData((prevState) => ({
      ...prevState,
      pageProfile: {
        results: prevState.pageProfile.results.map((profile) =>
          unfollowHelper(profile, clickedProfile)
        ),
      },
      followers_count: prevState.followers_count - 1, // Update followers count
      popularProfiles: {
        ...prevState.popularProfiles,
        results: prevState.popularProfiles.results.map((profile) =>
          unfollowHelper(profile, clickedProfile)
        ),
      },
    }));
  } catch (err) {
    console.log(err);
  }
};

useEffect(() => {
    const handleMount = async () => {
      try {
        // Fetch popular profiles
        const { data } = await axiosReq.get("/profiles/?ordering=-followers_count");
        setProfileData((prevState) => ({
          ...prevState,
          popularProfiles: data,
        }));
      } catch (err) {
        console.log(err);
      }
    };
    

    handleMount();
  }, [currentUser]);

  return (
    <ProfileDataContext.Provider value={profileData}>
      <SetProfileDataContext.Provider
        value={{ setProfileData, handleFollow, handleUnfollow }}
      >
        {children}
      </SetProfileDataContext.Provider>
    </ProfileDataContext.Provider>
  );
};

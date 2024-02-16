import { StreamData, UserData } from "@root/src/shared/service/TwitchClientTypes";

export interface FavoritesListItemProps {
    stream: StreamData | undefined;
    userData: UserData | undefined;
}

export const FavoritesListItem = (props: FavoritesListItemProps) => {
    const { userData, stream } = props;

    return (
        <div className="favorites-list-item">
            hai{userData.login} {stream.title}
        </div>
    );
};
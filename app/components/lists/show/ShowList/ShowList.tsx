// The imported libs.
import { observer } from "mobx-react";
import * as React from "react";

// The component's model type.
import { TShowList } from "../../../../models/show/ShowList";

// The external imported components.
import ShowListItem from "../ShowListItem/ShowListItem";

// The ShowList's props interface.
interface IShowListProps {
    showList: TShowList;
}

@observer
export default class ShowList extends React.Component<IShowListProps> {

    public render() {
        const { shows, isLoading } = this.props.showList;

        return (
            <div>
                <h1>Shows</h1>
                {!isLoading && <ul>
                    {shows.map((show, idx) => (
                        <ShowListItem key={idx} show={show} />
                    ))}
                </ul>}
                {isLoading && <div>
                    Loading...
                </div>}
            </div>
        );
    }
}

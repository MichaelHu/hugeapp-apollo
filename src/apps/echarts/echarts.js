import Bundle from 'Bundle';
import barBundle from 'bundle-loader?lazy!./components/bar';

export default function EchartsMain( props ) {
    return (
        <div>
            <Bundle load={barBundle}>
                {
                    ( Bar ) => {
                        return <Bar />;
                    }
                }
            </Bundle>
        </div>
    );
}

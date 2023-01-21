import { Helmet } from 'react-helmet-async';

const MetaData = ({ title, description }) => {
    return (
        <Helmet>
            <title>{title}</title>
            <meta name="description" content={description ? description : "Instabook Social media App."} />
        </Helmet>
    )
}
export default MetaData;
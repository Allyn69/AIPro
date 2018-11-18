import React, { Component } from 'react';
import { FormControl, Typography} from '@material-ui/core';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import TwitterStreamingAPIForm from './forms/TwitterStreamingAPIForm';
import FlatFileDataSourceForm from './forms/FlatFileDataSourceForm';
import FilterForm from './forms/FilterForm';
import CustomModelForm from './forms/CustomModelForm';
import PrebuiltModelForm from './forms/PrebuiltModelForm';
import FlatFileStorageForm from './forms/FlatFileStorageForm';
import MongoDBForm from './forms/MongoDBForm';
import { defaultModuleAttributes } from './constants/defaultAttributes';

const styles = theme => ({
    root: {
        paddingTop: theme.spacing.unit * 2,
        paddingBottom: theme.spacing.unit * 2
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular,
    },
});

class ModuleDetails extends Component {
    state = {
        attrs: this.props.attrs
    };

    handleChange = event => {
        this.setState({...this.state, [event.target.name]: event.target.value});
    }

    handleFile = event => {
        console.log(event.target.files);
    }

    getForm(formType) {
        switch(formType) {
            case 'FlatFileDataSource':
                return <FlatFileDataSourceForm alias={this.props.attrs.alias} filename={this.props.attrs.filename} />;
            case 'TwitterStreamingAPI':
                return <TwitterStreamingAPIForm alias={this.props.attrs.alias} />;
            case 'FlatFileStorage':
                return <FlatFileStorageForm alias={this.props.attrs.alias} filename={this.props.attrs.filename} />
            case 'CustomModel':
                return <CustomModelForm 
                            alias={this.props.attrs.alias}
                            module_file_path={this.props.attrs.module_file_path}
                            module_classname={this.props.attrs.module_classname}
                            method_name={this.props.attrs.method_name}
                            input_attribute={this.props.attrs.input_attribute}
                            output_attribute={this.props.attrs.output_attribute}
                            preprocessor={this.props.attrs.preprocessor}
                        />;
            case 'PrebuiltModel':
                return <PrebuiltModelForm alias={this.props.attrs.alias} subtype={this.props.attrs.subtype} />
            case 'Filter':
                return <FilterForm
                            alias={this.props.attrs.alias}
                            attribute={this.props.attrs.attribute}
                            condition={this.props.attrs.condition}
                            value={this.props.attrs.value}
                        />;
            case 'MongoDB':
                return <MongoDBForm 
                            alias={this.props.attrs.alias} 
                            host={this.props.attrs.host}
                            port={this.props.attrs.port}
                            db={this.props.attrs.db}
                            collection={this.props.attrs.collection}
                        />;
            default:
                return `No support yet for form type ${formType}`;
        }
    }

    render() {
        let { classes } = this.props;
        const form = this.getForm(this.props.attrs.type);
        return(
            <FormControl className={classes.root}>
                <Typography variant='h6'>
                    Module Details
                </Typography>
                {form}
            </FormControl>
        )
    }
}

const mapStateToProps = state => {
    const currentModule = state.currentModule;
    const index = currentModule.index;
    const category = currentModule.category;
    const pipeline = state.currentPipeline;
    const attrs = pipeline[category][index];
    
    return {
        attrs
    }
};
const mapDispatchToProps = null;
export default withStyles(styles)(
connect(
    mapStateToProps,
    mapDispatchToProps
)(ModuleDetails));

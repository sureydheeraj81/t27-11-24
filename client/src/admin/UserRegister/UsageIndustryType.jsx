import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { usageUserDetails } from "../../services/Apis"
import Sidebar from '../layout/Sidebar';

const UsageIndustryType = () => {
    const [dataType, setDataType] = useState('User Type');
    const [formValues, setFormValues] = useState({
        month: '',
        year: '',
        usageDetails: [
            { user_type: 'Other Government Users', rtk_region_1: '', rtk_region_2: '', rds_region_1: '', rds_region_2: '' },
            { user_type: 'Private Users', rtk_region_1: '', rtk_region_2: '', rds_region_1: '', rds_region_2: '' },
            { user_type: 'Research and Academic Users', rtk_region_1: '', rtk_region_2: '', rds_region_1: '', rds_region_2: '' },
            { user_type: 'Survey of India', rtk_region_1: '', rtk_region_2: '', rds_region_1: '', rds_region_2: '' },
            { user_type: 'Training and Maintenance', rtk_region_1: '', rtk_region_2: '', rds_region_1: '', rds_region_2: '' }
        ],
        industryDetails: [
            { industryType: '', rtkRegion1: '', rtkRegion2: '', rdsRegion1: '', rdsRegion2: '' }
        ]
    });

    const handleInputChange = (index, field, value, type) => {
        if (type === 'user') {
            const updatedDetails = [...formValues.usageDetails];
            updatedDetails[index][field] = value;
            setFormValues({ ...formValues, usageDetails: updatedDetails });
        } else if (type === 'industry') {
            const updatedDetails = [...formValues.industryDetails];
            updatedDetails[index][field] = value;
            setFormValues({ ...formValues, industryDetails: updatedDetails });
        }
    };

    const addIndustryRow = () => {
        setFormValues({
            ...formValues,
            industryDetails: [
                ...formValues.industryDetails,
                { industryType: '', rtkRegion1: '', rtkRegion2: '', rdsRegion1: '', rdsRegion2: '' }
            ]
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await usageUserDetails(formValues);

            setFormValues({
                month: '',
                year: '',
                usageDetails: [
                    { user_type: 'Other Government Users', rtk_region_1: '', rtk_region_2: '', rds_region_1: '', rds_region_2: '' },
                    { user_type: 'Private Users', rtk_region_1: '', rtk_region_2: '', rds_region_1: '', rds_region_2: '' },
                    { user_type: 'Research and Academic Users', rtk_region_1: '', rtk_region_2: '', rds_region_1: '', rds_region_2: '' },
                    { user_type: 'Survey of India', rtk_region_1: '', rtk_region_2: '', rds_region_1: '', rds_region_2: '' },
                    { user_type: 'Training and Maintenance', rtk_region_1: '', rtk_region_2: '', rds_region_1: '', rds_region_2: '' }
                ],
                industryDetails: [
                    { industryType: '', rtkRegion1: '', rtkRegion2: '', rdsRegion1: '', rdsRegion2: '' }
                ]
            });

            if (response.data.success === true) {
                toast.success("Data submitted successfully");
            }
        } catch (error) {
            toast.error('Error submitting form:', error);
        }
    };

    return (
        <Sidebar>
            <div className="container mt-5">
                <h3>Usage Details</h3>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <div className="d-flex justify-content-between align-items-center">
                            <div className="form-group">
                                <label htmlFor="dataType">Data Type:</label>
                                <select
                                    className="form-control"
                                    value={dataType}
                                    onChange={(e) => setDataType(e.target.value)}
                                >
                                    <option>User Type</option>
                                    <option>Industry Type</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label htmlFor="month">Month [MM]:</label>
                                <input
                                    type="number"
                                    minLength="2"
                                     maxLength="2"
                                     required
                                    id="month"
                                    className="form-control"
                                    value={formValues.month}
                                    onChange={(e) => setFormValues({ ...formValues, month: e.target.value })}
                                    placeholder="MM"
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="year">Year [YYYY]:</label>
                                <input
                                    type="number"
                                    id="year"
                                    required
                                    minLength="4"
                                     maxLength="4"
                                    className="form-control"
                                    value={formValues.year}
                                    onChange={(e) => setFormValues({ ...formValues, year: e.target.value })}
                                    placeholder="YYYY"
                                />
                            </div>
                        </div>
                    </div>

                    {dataType === 'User Type' && (
                        <div>
                            <div className="table-responsive">
                                <table className="table table-bordered">
                                    <thead className="table-dark">
                                        <tr>
                                            <th>User Type</th>
                                            <th>RTK Region 1</th>
                                            <th>RTK Region 2</th>
                                            <th>RDS Region 1</th>
                                            <th>RDS Region 2</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {formValues.usageDetails.map((detail, index) => (
                                            <tr key={index}>
                                                <td>{detail.user_type}</td>
                                                <td>
                                                    <input
                                                        type="number"
                                                        className="form-control"
                                                        value={detail.rtk_region_1}
                                                        onChange={(e) => handleInputChange(index, 'rtk_region_1', e.target.value, 'user')}
                                                    />
                                                </td>
                                                <td>
                                                    <input
                                                        type="number"
                                                        className="form-control"
                                                        value={detail.rtk_region_2}
                                                        onChange={(e) => handleInputChange(index, 'rtk_region_2', e.target.value, 'user')}
                                                    />
                                                </td>
                                                <td>
                                                    <input
                                                        type="number"
                                                        className="form-control"
                                                        value={detail.rds_region_1}
                                                        onChange={(e) => handleInputChange(index, 'rds_region_1', e.target.value, 'user')}
                                                    />
                                                </td>
                                                <td>
                                                    <input
                                                        type="number"
                                                        className="form-control"
                                                        value={detail.rds_region_2}
                                                        onChange={(e) => handleInputChange(index, 'rds_region_2', e.target.value, 'user')}
                                                    />
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            <div className="text-center">
                                <button type="submit" className="btn btn-success">Submit</button>
                            </div>
                        </div>
                    )}

                    {dataType === 'Industry Type' && (
                        <div>
                            <table className="table table-bordered">
                                <thead className="bg-danger text-white">
                                    <tr>
                                        <th>Industry Type</th>
                                        <th>RTK Region 1</th>
                                        <th>RTK Region 2</th>
                                        <th>RDS Region 1</th>
                                        <th>RDS Region 2</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {formValues.industryDetails.map((row, index) => (
                                        <tr key={index}>
                                            <td>
                                                <select
                                                    className="form-control"
                                                    value={row.industryType}
                                                    onChange={(e) => handleInputChange(index, 'industryType', e.target.value, 'industry')}
                                                >
                                                    <option>Select Category</option>
                                                    <option>Category 1</option>
                                                    <option>Category 2</option>
                                                    <option>Category 3</option>
                                                </select>
                                            </td>
                                            <td>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    value={row.rtkRegion1}
                                                    onChange={(e) => handleInputChange(index, 'rtkRegion1', e.target.value, 'industry')}
                                                />
                                            </td>
                                            <td>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    value={row.rtkRegion2}
                                                    onChange={(e) => handleInputChange(index, 'rtkRegion2', e.target.value, 'industry')}
                                                />
                                            </td>
                                            <td>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    value={row.rdsRegion1}
                                                    onChange={(e) => handleInputChange(index, 'rdsRegion1', e.target.value, 'industry')}
                                                />
                                            </td>
                                            <td>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    value={row.rdsRegion2}
                                                    onChange={(e) => handleInputChange(index, 'rdsRegion2', e.target.value, 'industry')}
                                                />
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>

                            <div className="text-center">
                                <button type="button" className="btn btn-primary me-2" onClick={addIndustryRow}>
                                    Add More
                                </button>
                                <button type="submit" className="btn btn-success">
                                    Submit
                                </button>
                            </div>
                        </div>
                    )}
                </form>
            </div>
        </Sidebar>
    );
};

export default UsageIndustryType;
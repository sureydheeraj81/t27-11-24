const usageUserType=require("../models/usage_user_type")

exports.usageUserType = async (req, res) => {
  try {
    const { month, year, submitted_by, usageDetails } = req.body;

    const promises = usageDetails.map(async (detail) => {
      return await usageUserType.create({
        user_type: detail.user_type,
        rtk_region_1: detail.rtk_region_1 || null,
        rtk_region_2: detail.rtk_region_2 || null,
        rds_region_1: detail.rds_region_1 || null,
        rds_region_2: detail.rds_region_2 || null,
        month,
        year,
        submitted_by,
      });
    });

   const result= await Promise.all(promises);
    

    res.status(201).json({success:true, message: 'Data saved successfully!',Data:result });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
exports.getallusageUserType = async (req, res) => {
  try {
    const result = await usageUserType.findAll()
    res.status(200).json({ success: true, message: 'Data fetched successfully!', data: result })
  }
  catch (error) {
    res.status(500).json({ success: false, message: "Unable to getdata data !!!", error })
  }
}

exports.getsingleusageUserType = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await usageUserType.findByPk(id)
    if (!result) {
      res.status(404).json({ success: false, message: "Data not found !!!", error })

    } else {
      res.status(200).json({ success: true, message: 'Data fetched successfully !!!', Data: result })
    }

  }
  catch (error) {
    res.status(500).json({ success: false, message: "Unable to getsingledata data !!!", error })

  }
}
exports.updateusageUserType = async (req, res) => {
  try {
    const { month, year, submitted_by, usageDetails } = req.body;
    const id = req.params.id;

    if (!month || !year) {
      return res.status(400).json({
        success: false,
        message: "All Fields are required !!!"
      });
    }

    const promises = usageDetails.map(async (detail) => {
      const { user_type,  rtk_region_1,  rtk_region_2,  rds_region_1,  rds_region_2 } = detail;

      await usageUserType.update(
        {
          user_type,
           rtk_region_1:  rtk_region_1 || null,
           rtk_region_2:  rtk_region_2 || null,
           rds_region_1:  rds_region_1 || null,
           rds_region_2:  rds_region_2 || null,
          month,
          year,
          submitted_by
        },
        { where: { id: id } }
      );

      const updatedRecord = await usageUserType.findOne({
        where: { id: id },
      });

      return updatedRecord;
    });

    const result = await Promise.all(promises);
    res.status(200).json({ success: true, message: 'Data updated successfully!', data: result });
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error', error });
  }
};
exports.deleteUsageUserData = async (req, res) => {
  try {
    const result = await usageUserType.findByPk(req.params.id);

    if (result) {
      await result.destroy()
      res.status(200).json({ success: true, message: 'Data deleted successfully !!!' })
    } else {
      res.status(404).json({ success: false, message: 'Data not found !!!' })
    }
  }
  catch (error) {
    res.status(500).json({ success: false, message: "Unable to delete data !!!", error })
  }
}


































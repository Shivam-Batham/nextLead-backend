import type { NextFunction, Request, Response } from 'express';
import { Domain } from '../models/domainModel.ts';

export async function createDomain(req: Request, res: Response, next: NextFunction) {
  try {
    const { domainName } = req.body;
    if (!domainName) {
      return res.status(400).json({
        success: false,
        message: 'DomainName is required.',
      });
    }
    const existingDomain = await Domain.findOne({ domainName: domainName });
    if (existingDomain) {
      return res.status(409).json({
        success: false,
        message: 'Domain is already exists.',
      });
    }

    let domain = new Domain({ domainName: domainName });
    domain = await domain.save();

    return res.status(201).json({
      success: true,
      message: 'New domain is created successfully.',
      data: domain,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
}

export async function getDomain(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.body;
    if (!id) {
      return res.status(400).json({
        success: false,
        message: 'Domain id is required.',
      });
    }
    const existingDomain = await Domain.findById(id);
    if (!existingDomain) {
      return res.status(404).json({
        success: false,
        message: 'Domain is not found.',
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Domain found.',
      data: existingDomain,
    });
  } catch (error) {
    next(error);
  }
}
export async function getAllDomain(req: Request, res: Response, next: NextFunction) {
  try {
    const allDomain = await Domain.find();

    return res.status(200).json({
      success: true,
      message: 'Domain found.',
      data: allDomain.length > 0 ? allDomain : [],
    });
  } catch (error) {
    next(error);
  }
}

export async function updateDomain(req: Request, res: Response, next: NextFunction) {
  try {
    const { id, domain } = req.body;
    if (!(id && domain)) {
      return res.status(400).json({
        success: false,
        message: 'Domain id and name is required.',
      });
    }
    const existingDomain = await Domain.findOneAndReplace({ _id: id }, { domainName: domain }, { new: true });
    if (!existingDomain) {
      return res.status(404).json({
        success: false,
        message: 'Domain not found.',
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Domain name is updated.',
      data: existingDomain,
    });
  } catch (error) {
    next(error);
  }
}

export async function deleteDomain(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.body;
    if (!id) {
      return res.status(400).json({
        success: false,
        message: 'Domain id is required.',
      });
    }
    const data = await Domain.findOneAndDelete(id);
    if (!data) {
      return res.status(404).json({
        success: false,
        message: 'Domain not found.',
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Domain is deleted successfully.',
    });
  } catch (error) {
    next(error);
  }
}

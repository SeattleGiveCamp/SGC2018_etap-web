////////////////////////////////////////////////////////
// Copyright (c) 2018 Sameer Khandekar                //
// License: MIT License.                              //
////////////////////////////////////////////////////////
using System;
using System.Threading.Tasks;
using CloudClientLibrary.Models;

namespace CloudClientLibrary
{
    public interface ITableClient
    {
        Task AddFormData(FormDataEntity formData);
    }
}
